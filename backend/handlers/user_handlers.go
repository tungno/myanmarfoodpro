package handlers

import (
	"MyanmarFood/models"
	"database/sql"
	"encoding/json"
	"github.com/dgrijalva/jwt-go"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/go-playground/validator/v10"
	"golang.org/x/crypto/bcrypt"
)

type UserHandler struct {
	db           *sql.DB
	userValidate *validator.Validate
}

func NewUserHandler(db *sql.DB) *UserHandler {
	return &UserHandler{
		db:           db,
		userValidate: validator.New(),
	}
}

// Helper function to send error responses in JSON format
func sendErrorResponse(w http.ResponseWriter, statusCode int, message string) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(statusCode)
	json.NewEncoder(w).Encode(map[string]string{"error": message})
}

func (h *UserHandler) Signup(w http.ResponseWriter, r *http.Request) {
	log.Println("Signup endpoint hit.")
	w.Header().Set("Content-Type", "application/json")

	var user models.User

	if err := json.NewDecoder(r.Body).Decode(&user); err != nil {
		log.Printf("Error decoding user data: %v", err)
		sendErrorResponse(w, http.StatusBadRequest, "Invalid request payload")
		return
	}

	// Validate user data
	if err := h.userValidate.Struct(user); err != nil {
		log.Printf("User validation failed: %v", err)
		sendErrorResponse(w, http.StatusBadRequest, "Validation error: "+err.Error())
		return
	}

	// Check if the user already exists
	var exists int
	err := h.db.QueryRow("SELECT COUNT(*) FROM User WHERE email = ?", user.Email).Scan(&exists)
	if err != nil {
		sendErrorResponse(w, http.StatusInternalServerError, "Database error")
		return
	}
	if exists > 0 {
		sendErrorResponse(w, http.StatusBadRequest, "User with this email already exists")
		return
	}

	// Hash the password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		sendErrorResponse(w, http.StatusInternalServerError, "Error hashing password")
		return
	}
	user.Password = string(hashedPassword)

	// Insert the user into the database
	query := "INSERT INTO User (name, email, password, cart_data, date) VALUES (?, ?, ?, ?, ?)"
	_, err = h.db.Exec(query, user.Name, user.Email, user.Password, "{}", time.Now().Format("2006-01-02 15:04:05"))
	if err != nil {
		log.Printf("Error inserting user into database: %v", err)
		sendErrorResponse(w, http.StatusInternalServerError, "Failed to register user")
		return
	}

	// Retrieve JWT secret
	jwtSecret := os.Getenv("JWT_SECRET")
	if jwtSecret == "" {
		sendErrorResponse(w, http.StatusInternalServerError, "JWT secret is not set")
		return
	}

	// Create JWT token
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"user_id": user.ID,
		"exp":     time.Now().Add(time.Hour * 72).Unix(),
	})

	tokenString, err := token.SignedString([]byte(jwtSecret))
	if err != nil {
		sendErrorResponse(w, http.StatusInternalServerError, "Failed to create token")
		return
	}

	jsonResponse := map[string]interface{}{
		"success": true,
		"token":   tokenString,
	}
	w.WriteHeader(http.StatusCreated)
	if err := json.NewEncoder(w).Encode(jsonResponse); err != nil {
		sendErrorResponse(w, http.StatusInternalServerError, "Failed to send response: "+err.Error())
	}
}

func (h *UserHandler) Login(w http.ResponseWriter, r *http.Request) {
	log.Println("Login endpoint hit.")
	w.Header().Set("Content-Type", "application/json")

	var user models.User
	var dbUser models.User

	if err := json.NewDecoder(r.Body).Decode(&user); err != nil {
		log.Printf("Error decoding user data: %v", err)
		sendErrorResponse(w, http.StatusBadRequest, "Invalid request payload")
		return
	}

	// Retrieve the user from the database
	err := h.db.QueryRow("SELECT id, name, email, password, cart_data, date FROM User WHERE email = ?", user.Email).Scan(
		&dbUser.ID, &dbUser.Name, &dbUser.Email, &dbUser.Password, &dbUser.CartData, &dbUser.Date)
	if err != nil {
		sendErrorResponse(w, http.StatusBadRequest, "Invalid email or password")
		return
	}

	// Compare the provided password with the hashed password
	if err := bcrypt.CompareHashAndPassword([]byte(dbUser.Password), []byte(user.Password)); err != nil {
		sendErrorResponse(w, http.StatusBadRequest, "Invalid email or password")
		return
	}

	// Retrieve JWT secret
	jwtSecret := os.Getenv("JWT_SECRET")
	if jwtSecret == "" {
		sendErrorResponse(w, http.StatusInternalServerError, "JWT secret is not set")
		return
	}

	// Create JWT token
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"user_id": dbUser.ID,
		"exp":     time.Now().Add(time.Hour * 72).Unix(),
	})

	tokenString, err := token.SignedString([]byte(jwtSecret))
	if err != nil {
		sendErrorResponse(w, http.StatusInternalServerError, "Failed to create token")
		return
	}

	jsonResponse := map[string]interface{}{
		"success": true,
		"token":   tokenString,
	}
	w.WriteHeader(http.StatusOK)
	if err := json.NewEncoder(w).Encode(jsonResponse); err != nil {
		sendErrorResponse(w, http.StatusInternalServerError, "Failed to send response: "+err.Error())
	}
}
