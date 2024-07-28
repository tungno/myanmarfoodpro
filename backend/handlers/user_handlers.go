package handlers

import (
	"database/sql"
	"encoding/json"
	"net/http"
	"strconv"
	"time"

	"MyanmarFood/models"
	"github.com/go-playground/validator/v10"
	"github.com/gorilla/mux"
)

type UserHandler struct {
	db *sql.DB
}

var userValidate *validator.Validate

func init() {
	userValidate = validator.New()
}

func NewUserHandler(db *sql.DB) *UserHandler {
	return &UserHandler{db: db}
}

func (h *UserHandler) GetUsers(w http.ResponseWriter, r *http.Request) {
	rows, err := h.db.Query("SELECT UserID, Password, Email, FirstName, LastName, LastLogin, PhoneNumber, DateCreated, IsActive, IsDeleted, CreatedBy, UpdatedBy FROM User")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	users := []models.User{}
	for rows.Next() {
		var user models.User
		var lastLogin, dateCreated []byte
		if err := rows.Scan(
			&user.UserID,
			&user.Password,
			&user.Email,
			&user.FirstName,
			&user.LastName,
			&lastLogin,
			&user.PhoneNumber,
			&dateCreated,
			&user.IsActive,
			&user.IsDeleted,
			&user.CreatedBy,
			&user.UpdatedBy); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		user.LastLogin, err = time.Parse("2006-01-02 15:04:05", string(lastLogin))
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		user.DateCreated, err = time.Parse("2006-01-02 15:04:05", string(dateCreated))
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		users = append(users, user)
	}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(users); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}

func (h *UserHandler) CreateUser(w http.ResponseWriter, r *http.Request) {
	var user models.User
	if err := json.NewDecoder(r.Body).Decode(&user); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	if err := userValidate.Struct(user); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	query := `INSERT INTO User (Password, Email, FirstName, LastName, LastLogin, PhoneNumber, DateCreated, IsActive, IsDeleted, CreatedBy, UpdatedBy) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
	now := time.Now()
	_, err := h.db.Exec(query, user.Password, user.Email, user.FirstName, user.LastName, now, user.PhoneNumber, now, user.IsActive, user.IsDeleted, user.CreatedBy, user.UpdatedBy)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	w.Header().Set("Content-Type", "application/json")
	w.Write([]byte(`{"message": "User created successfully"}`))
}

func (h *UserHandler) GetUser(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := strconv.Atoi(vars["id"])
	if err != nil {
		http.Error(w, "Invalid user ID", http.StatusBadRequest)
		return
	}

	var user models.User
	var lastLogin, dateCreated []byte

	query := "SELECT UserID, Password, Email, FirstName, LastName, LastLogin, PhoneNumber, DateCreated, IsActive, IsDeleted, CreatedBy, UpdatedBy FROM User WHERE UserID = ?"
	if err := h.db.QueryRow(query, id).Scan(
		&user.UserID,
		&user.Password,
		&user.Email,
		&user.FirstName,
		&user.LastName,
		&lastLogin,
		&user.PhoneNumber,
		&dateCreated,
		&user.IsActive,
		&user.IsDeleted,
		&user.CreatedBy,
		&user.UpdatedBy); err != nil {
		if err == sql.ErrNoRows {
			http.Error(w, "User not found", http.StatusNotFound)
		} else {
			http.Error(w, err.Error(), http.StatusInternalServerError)
		}
		return
	}

	user.LastLogin, err = time.Parse("2006-01-02 15:04:05", string(lastLogin))
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	user.DateCreated, err = time.Parse("2006-01-02 15:04:05", string(dateCreated))
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(user); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}

func (h *UserHandler) UpdateUser(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := strconv.Atoi(vars["id"])
	if err != nil {
		http.Error(w, "Invalid user ID", http.StatusBadRequest)
		return
	}

	var user models.User
	if err := json.NewDecoder(r.Body).Decode(&user); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	if err := userValidate.Struct(user); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	query := `UPDATE User SET Password = ?, Email = ?, FirstName = ?, LastName = ?, LastLogin = ?, PhoneNumber = ?, IsActive = ?, IsDeleted = ?, UpdatedBy = ? WHERE UserID = ?`
	now := time.Now()
	result, err := h.db.Exec(query, user.Password, user.Email, user.FirstName, user.LastName, now, user.PhoneNumber, user.IsActive, user.IsDeleted, user.UpdatedBy, id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	rowsAffected, err := result.RowsAffected()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	if rowsAffected == 0 {
		http.Error(w, "User ID not found", http.StatusNotFound)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Header().Set("Content-Type", "application/json")
	w.Write([]byte(`{"message": "User updated successfully"}`))
}

func (h *UserHandler) DeleteUser(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := strconv.Atoi(vars["id"])
	if err != nil {
		http.Error(w, "Invalid user ID", http.StatusBadRequest)
		return
	}

	query := "DELETE FROM User WHERE UserID = ?"
	result, err := h.db.Exec(query, id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	rowsAffected, err := result.RowsAffected()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	if rowsAffected == 0 {
		http.Error(w, "User ID not found", http.StatusNotFound)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}
