package handlers

import (
	"database/sql"
	"encoding/json"
	"net/http"
	"strconv"

	"MyanmarFood/models"
	"github.com/go-playground/validator/v10"
	"github.com/gorilla/mux"
)

type AdminHandler struct {
	db *sql.DB
}

var adminValidate *validator.Validate

func init() {
	adminValidate = validator.New()
}

func NewAdminHandler(db *sql.DB) *AdminHandler {
	return &AdminHandler{db: db}
}

func (h *AdminHandler) GetAdmins(w http.ResponseWriter, r *http.Request) {
	rows, err := h.db.Query("SELECT UserID, Role FROM Admin")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	admins := []models.Admin{}
	for rows.Next() {
		var a models.Admin
		if err := rows.Scan(&a.UserID, &a.Role); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		admins = append(admins, a)
	}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(admins); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}

func (h *AdminHandler) CreateAdmin(w http.ResponseWriter, r *http.Request) {
	var a models.Admin
	if err := json.NewDecoder(r.Body).Decode(&a); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	if err := adminValidate.Struct(a); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Check if the UserID already exists in Customer table
	var exists bool
	query := "SELECT EXISTS(SELECT 1 FROM Customer WHERE UserID = ?)"
	err := h.db.QueryRow(query, a.UserID).Scan(&exists)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if exists {
		http.Error(w, "UserID already exists in Customer", http.StatusBadRequest)
		return
	}

	// Check if the UserID already exists in Admin table
	query = "SELECT EXISTS(SELECT 1 FROM Admin WHERE UserID = ?)"
	err = h.db.QueryRow(query, a.UserID).Scan(&exists)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if exists {
		http.Error(w, "UserID already exists in Admin", http.StatusBadRequest)
		return
	}

	query = `INSERT INTO Admin (UserID, Role) VALUES (?, ?)`
	_, err = h.db.Exec(query, a.UserID, a.Role)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	w.Header().Set("Content-Type", "application/json")
	w.Write([]byte(`{"message": "Admin created successfully"}`))
}

func (h *AdminHandler) GetAdmin(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := strconv.Atoi(vars["id"])
	if err != nil {
		http.Error(w, "Invalid admin ID", http.StatusBadRequest)
		return
	}

	var a models.Admin
	query := "SELECT UserID, Role FROM Admin WHERE UserID = ?"
	if err := h.db.QueryRow(query, id).Scan(&a.UserID, &a.Role); err != nil {
		if err == sql.ErrNoRows {
			http.Error(w, "Admin not found", http.StatusNotFound)
		} else {
			http.Error(w, err.Error(), http.StatusInternalServerError)
		}
		return
	}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(a); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}

func (h *AdminHandler) UpdateAdmin(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := strconv.Atoi(vars["id"])
	if err != nil {
		http.Error(w, "Invalid admin ID", http.StatusBadRequest)
		return
	}

	var a models.Admin
	if err := json.NewDecoder(r.Body).Decode(&a); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	if err := adminValidate.Struct(a); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	query := `UPDATE Admin SET Role = ? WHERE UserID = ?`
	result, err := h.db.Exec(query, a.Role, id)
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
		http.Error(w, "Admin ID not found", http.StatusNotFound)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Header().Set("Content-Type", "application/json")
	w.Write([]byte(`{"message": "Admin updated successfully"}`))
}

func (h *AdminHandler) DeleteAdmin(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := strconv.Atoi(vars["id"])
	if err != nil {
		http.Error(w, "Invalid admin ID", http.StatusBadRequest)
		return
	}

	query := "DELETE FROM Admin WHERE UserID = ?"
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
		http.Error(w, "Admin ID not found", http.StatusNotFound)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}
