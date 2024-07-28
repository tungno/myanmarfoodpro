package handlers

import (
	"database/sql"
	"encoding/json"
	"net/http"
	"time"

	"github.com/go-playground/validator/v10"
	"golang.org/x/crypto/bcrypt"
)

type RegistrationHandler struct {
	db *sql.DB
}

var registrationValidate *validator.Validate

func init() {
	registrationValidate = validator.New()
}

func NewRegistrationHandler(db *sql.DB) *RegistrationHandler {
	return &RegistrationHandler{db: db}
}

type RegisterRequest struct {
	Email       string `json:"email" validate:"required,email"`
	PhoneNumber string `json:"phone_number" validate:"required"`
}

type CompleteRegisterRequest struct {
	RegisterRequest
	Password  string `json:"password" validate:"required"`
	FirstName string `json:"first_name" validate:"required"`
	LastName  string `json:"last_name" validate:"required"`
	//AgreeTerms bool   `json:"agree_terms" validate:"required"`
	//Role       string `json:"role" validate:"required,oneof=customer admin"`
}

func (h *RegistrationHandler) RegisterCustomer(w http.ResponseWriter, r *http.Request) {
	h.registerUser(w, r, "customer")
}

func (h *RegistrationHandler) RegisterAdmin(w http.ResponseWriter, r *http.Request) {
	h.registerUser(w, r, "admin")
}
func (h *RegistrationHandler) RegisterUser(w http.ResponseWriter, r *http.Request) {
	h.registerUser(w, r, "user")
}

func (h *RegistrationHandler) registerUser(w http.ResponseWriter, r *http.Request, role string) {
	var completeReq CompleteRegisterRequest
	if err := json.NewDecoder(r.Body).Decode(&completeReq); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Validate initial fields
	initialReq := RegisterRequest{
		Email:       completeReq.Email,
		PhoneNumber: completeReq.PhoneNumber,
	}

	if err := registrationValidate.Struct(initialReq); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Check if email already exists
	var count int
	query := `SELECT COUNT(*) FROM User WHERE Email = ?`
	if err := h.db.QueryRow(query, initialReq.Email).Scan(&count); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	if count > 0 {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusConflict) // 409 Conflict
		w.Write([]byte(`{"message": "Email is already registered. Please login instead."}`))
		return
	}

	// Validate the complete request
	if err := registrationValidate.Struct(completeReq); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	//if !completeReq.AgreeTerms {
	//	http.Error(w, "You must agree to the terms and conditions", http.StatusBadRequest)
	//	return
	//}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(completeReq.Password), bcrypt.DefaultCost)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	query = `INSERT INTO User (FirstName, LastName, Email, Password, PhoneNumber, LastLogin, DateCreated, IsActive, IsDeleted) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
	now := time.Now()
	result, err := h.db.Exec(query, completeReq.FirstName, completeReq.LastName, completeReq.Email, hashedPassword, completeReq.PhoneNumber, now, now, true, false)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	userID, err := result.LastInsertId()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	if role == "customer" {
		query = `INSERT INTO Customer (UserID, LoyaltyPoints) VALUES (?, ?)`
		_, err = h.db.Exec(query, userID, 0)
	} else if role == "admin" {
		query = `INSERT INTO Admin (UserID, Role) VALUES (?, ?)`
		_, err = h.db.Exec(query, userID, "admin")
	}

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	w.Header().Set("Content-Type", "application/json")
	w.Write([]byte(`{"message": "User registered successfully"}`))
}
