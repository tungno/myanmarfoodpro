package handlers

import (
	"database/sql"
	"encoding/json"
	"net/http"
	"time"

	"MyanmarFood/models"
	"github.com/dgrijalva/jwt-go"
	"github.com/go-playground/validator/v10"
	"golang.org/x/crypto/bcrypt"
)

type LoginHandler struct {
	db     *sql.DB
	secret string
}

var loginValidate *validator.Validate

func init() {
	loginValidate = validator.New()
}

func NewLoginHandler(db *sql.DB, secret string) *LoginHandler {
	return &LoginHandler{db: db, secret: secret}
}

type LoginRequest struct {
	Email    string `json:"email" validate:"required,email"`
	Password string `json:"password" validate:"required"`
}

type LoginResponse struct {
	Token string `json:"token"`
}

type ErrorResponse struct {
	Message string `json:"message"`
}

func (h *LoginHandler) LoginUser(w http.ResponseWriter, r *http.Request) {
	var req LoginRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		h.respondWithError(w, http.StatusBadRequest, "Invalid request payload")
		return
	}

	if err := loginValidate.Struct(req); err != nil {
		h.respondWithError(w, http.StatusBadRequest, "Invalid request parameters")
		return
	}

	var user models.User
	query := "SELECT UserID, Password FROM User WHERE Email = ?"
	if err := h.db.QueryRow(query, req.Email).Scan(&user.UserID, &user.Password); err != nil {
		if err == sql.ErrNoRows {
			h.respondWithError(w, http.StatusUnauthorized, "Invalid email or password")
		} else {
			h.respondWithError(w, http.StatusInternalServerError, "Internal server error")
		}
		return
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(req.Password)); err != nil {
		h.respondWithError(w, http.StatusUnauthorized, "Invalid email or password")
		return
	}

	now := time.Now()
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"userID":       user.UserID,
		"exp":          now.Add(time.Hour * 72).Unix(),
		"lastActivity": now.Unix(),
	})

	tokenString, err := token.SignedString([]byte(h.secret))
	if err != nil {
		h.respondWithError(w, http.StatusInternalServerError, "Internal server error")
		return
	}

	response := LoginResponse{Token: tokenString}
	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(response); err != nil {
		h.respondWithError(w, http.StatusInternalServerError, "Internal server error")
	}
}

func (h *LoginHandler) respondWithError(w http.ResponseWriter, code int, message string) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(code)
	json.NewEncoder(w).Encode(ErrorResponse{Message: message})
}
