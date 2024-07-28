// main.go
package main

import (
	"database/sql"
	"encoding/json"
	"github.com/rs/cors"
	"log"
	"net/http"
	"os"
	"strings"
	// "time"

	"MyanmarFood/handlers"
	"MyanmarFood/middleware"
	"github.com/dgrijalva/jwt-go"
	_ "github.com/go-sql-driver/mysql"
	"github.com/gorilla/mux"
	"golang.org/x/crypto/bcrypt"
)

var db *sql.DB

func initDB() {
	var err error
	dsn := "root:@tcp(127.0.0.1:3306)/MyanmarFood"
	db, err = sql.Open("mysql", dsn)
	if err != nil {
		log.Fatalf("Error opening database: %v", err)
	}
	if err = db.Ping(); err != nil {
		log.Fatalf("Error connecting to the database: %v", err)
	}
	log.Println("Connected to the database")
}

func updatePassword(username, password string) error {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}
	_, err = db.Exec("UPDATE User SET Password = ? WHERE Username = ?", hashedPassword, username)
	return err
}

func main() {
	initDB()
	defer db.Close()

	port := os.Getenv("PORT")
	if port == "" {
		log.Println("$PORT has not been set. Default: 8080")
		port = "8080"
	}

	secret := "secret" // Use a more secure way to manage secrets in production
	loginHandler := handlers.NewLoginHandler(db, secret)
	registerHandler := handlers.NewRegistrationHandler(db)
	logoutHandler := handlers.NewLogoutHandler(secret)

	userHandler := handlers.NewUserHandler(db)
	customerHandler := handlers.NewCustomerHandler(db)
	adminHandler := handlers.NewAdminHandler(db)
	addressHandler := handlers.NewAddressHandler(db)

	router := mux.NewRouter()

	// Define API routes first
	router.HandleFunc("/api/register/customer", registerHandler.RegisterCustomer).Methods("POST")
	router.HandleFunc("/api/login", loginHandler.LoginUser).Methods("POST")
	router.HandleFunc("/api/logout", logoutHandler.Logout).Methods("POST")
	router.HandleFunc("/api/validate-token", validateToken(secret)).Methods("GET")
	// Add this to your existing main.go file
	router.HandleFunc("/api/register/user", registerHandler.RegisterUser).Methods("POST")

	adminRouter := router.PathPrefix("/api").Subrouter()
	adminRouter.Use(middleware.JWTAuth(secret))
	adminRouter.HandleFunc("/register/admin", registerHandler.RegisterAdmin).Methods("POST")

	protectedRouter := router.PathPrefix("/api").Subrouter()
	protectedRouter.Use(middleware.JWTAuth(secret))
	protectedRouter.HandleFunc("/users", userHandler.GetUsers).Methods("GET")
	protectedRouter.HandleFunc("/users", userHandler.CreateUser).Methods("POST")
	protectedRouter.HandleFunc("/users/{id}", userHandler.GetUser).Methods("GET")
	protectedRouter.HandleFunc("/users/{id}", userHandler.UpdateUser).Methods("PUT")
	protectedRouter.HandleFunc("/users/{id}", userHandler.DeleteUser).Methods("DELETE")

	protectedRouter.HandleFunc("/customers", customerHandler.GetCustomers).Methods("GET")
	protectedRouter.HandleFunc("/customers", customerHandler.CreateCustomer).Methods("POST")
	protectedRouter.HandleFunc("/customers/{id}", customerHandler.GetCustomer).Methods("GET")
	protectedRouter.HandleFunc("/customers/{id}", customerHandler.UpdateCustomer).Methods("PUT")
	protectedRouter.HandleFunc("/customers/{id}", customerHandler.DeleteCustomer).Methods("DELETE")

	protectedRouter.HandleFunc("/admins", adminHandler.GetAdmins).Methods("GET")
	protectedRouter.HandleFunc("/admins", adminHandler.CreateAdmin).Methods("POST")
	protectedRouter.HandleFunc("/admins/{id}", adminHandler.GetAdmin).Methods("GET")
	protectedRouter.HandleFunc("/admins/{id}", adminHandler.UpdateAdmin).Methods("PUT")
	protectedRouter.HandleFunc("/admins/{id}", adminHandler.DeleteAdmin).Methods("DELETE")

	// Address endpoints
	protectedRouter.HandleFunc("/addresses", addressHandler.GetAddresses).Methods("GET")
	protectedRouter.HandleFunc("/addresses", addressHandler.CreateAddress).Methods("POST")
	protectedRouter.HandleFunc("/addresses/{id}", addressHandler.GetAddress).Methods("GET")
	protectedRouter.HandleFunc("/addresses/{id}", addressHandler.UpdateAddress).Methods("PUT")
	protectedRouter.HandleFunc("/addresses/{id}", addressHandler.DeleteAddress).Methods("DELETE")

	// Serve static HTML files
	router.PathPrefix("/").Handler(http.StripPrefix("/", customFileServer(http.Dir("static/html"))))

	// Serve other static files
	router.PathPrefix("/static/").Handler(http.StripPrefix("/static/", customFileServer(http.Dir("static"))))

	// Configure CORS middleware
	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://127.0.0.1:5500"}, // Adjust this to your frontend's origin
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE"},
		AllowedHeaders:   []string{"*"},
		AllowCredentials: true,
	})

	log.Println("Starting server on port " + port + " ...")
	handler := c.Handler(router)
	log.Fatal(http.ListenAndServe(":"+port, handler))
}

func customFileServer(fs http.FileSystem) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		path := r.URL.Path
		if strings.HasSuffix(path, ".js") {
			w.Header().Set("Content-Type", "application/javascript")
		} else if strings.HasSuffix(path, ".css") {
			w.Header().Set("Content-Type", "text/css")
		}
		http.FileServer(fs).ServeHTTP(w, r)
	})
}

func validateToken(secret string) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		tokenString := r.Header.Get("Authorization")
		if !strings.HasPrefix(tokenString, "Bearer ") {
			http.Error(w, "Invalid token format", http.StatusUnauthorized)
			return
		}
		tokenString = strings.TrimPrefix(tokenString, "Bearer ")

		token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
			return []byte(secret), nil
		})

		if err != nil || !token.Valid {
			http.Error(w, "Invalid token", http.StatusUnauthorized)
			return
		}

		response := struct {
			Valid bool `json:"valid"`
		}{Valid: true}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(response)
	}
}
