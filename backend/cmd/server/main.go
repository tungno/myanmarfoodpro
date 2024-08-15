// /backend/cmd/server/main.go
package main

import (
	"MyanmarFood/middleware"
	"database/sql"
	"github.com/rs/cors"
	"log"
	"net/http"
	"os"

	"MyanmarFood/handlers"
	_ "github.com/go-sql-driver/mysql"
	"github.com/gorilla/mux"
)

var db *sql.DB

func initDB() {
	var err error
	dsn := "root:@tcp(127.0.0.1:3306)/mmfood"
	//dsn := "root:tungno@tcp(db:3306)/mmfood"
	db, err = sql.Open("mysql", dsn)
	if err != nil {
		log.Fatalf("Error opening database: %v", err)
	}
	if err = db.Ping(); err != nil {
		log.Fatalf("Error connecting to the database: %v", err)
	}
	log.Println("Connected to the database")
}

func homePage(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusOK)
	w.Write([]byte("This is the home page"))
}

func main() {
	log.Println("JWT_SECRET:", os.Getenv("JWT_SECRET"))
	initDB()
	defer db.Close()

	port := os.Getenv("PORT")
	if port == "" {
		log.Println("$PORT has not been set. Default: 8080")
		port = "8080"
	}

	productHandler := handlers.NewProductHandler(db)
	userHandler := handlers.NewUserHandler(db)
	productforyouHandler := handlers.NewProductforyouHandler(db)
	relatedProductsHandler := handlers.NewRelatedProductsHandler(db)
	cartHandler := handlers.NewCartHandler(db)

	router := mux.NewRouter()

	// Home page route
	router.HandleFunc("/", homePage).Methods("GET")

	// Add the image upload route
	router.HandleFunc("/upload", productHandler.ImageUploadHandler).Methods("POST")
	// Serve static files from the upload/images directory
	router.PathPrefix("/images/").Handler(http.StripPrefix("/images/", http.FileServer(http.Dir("./upload/images"))))

	// Define API routes first
	router.HandleFunc("/products", productHandler.CreateProduct).Methods("POST")
	router.HandleFunc("/products", productHandler.GetProduct).Methods("GET")
	router.HandleFunc("/products/{id}", productHandler.GetProduct).Methods("GET")
	router.HandleFunc("/products/{id}", productHandler.UpdateProduct).Methods("PUT")
	router.HandleFunc("/products/{id}", productHandler.DeleteProduct).Methods("DELETE")

	// Signup and login routes
	router.HandleFunc("/signup", userHandler.Signup).Methods("POST")
	router.HandleFunc("/login", userHandler.Login).Methods("POST")

	// Product for you routes
	router.HandleFunc("/productforyou", productforyouHandler.ProductForYou).Methods("GET")
	// Related product route
	router.HandleFunc("/relatedproducts", relatedProductsHandler.RelatedProducts).Methods("POST")

	// Protected routes
	router.Handle("/addtocart", middleware.FetchUserMiddleware(http.HandlerFunc(cartHandler.AddToCart))).Methods("POST")
	router.Handle("/removefromcart", middleware.FetchUserMiddleware(http.HandlerFunc(cartHandler.RemoveFromCart))).Methods("DELETE")
	router.Handle("/getcart", middleware.FetchUserMiddleware(http.HandlerFunc(cartHandler.GetCart))).Methods("POST")

	// Configure CORS middleware
	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:3000", "http://localhost:5173"}, // Adjust this to your frontend's origin
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE"},
		AllowedHeaders:   []string{"*"},
		AllowCredentials: true,
	})

	log.Println("Starting server on port " + port + " ...")
	handler := c.Handler(router)
	log.Fatal(http.ListenAndServe(":"+port, handler))
}

// export JWT_SECRET=your_secret_key_here
