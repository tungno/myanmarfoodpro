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

type CustomerHandler struct {
	db *sql.DB
}

var customerValidate *validator.Validate

func init() {
	customerValidate = validator.New()
}

func NewCustomerHandler(db *sql.DB) *CustomerHandler {
	return &CustomerHandler{db: db}
}

func (h *CustomerHandler) GetCustomers(w http.ResponseWriter, r *http.Request) {
	rows, err := h.db.Query("SELECT UserID, LoyaltyPoints FROM Customer")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	customers := []models.Customer{}
	for rows.Next() {
		var c models.Customer
		if err := rows.Scan(&c.UserID, &c.LoyaltyPoints); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		customers = append(customers, c)
	}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(customers); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}

func (h *CustomerHandler) CreateCustomer(w http.ResponseWriter, r *http.Request) {
	var c models.Customer
	if err := json.NewDecoder(r.Body).Decode(&c); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	if err := customerValidate.Struct(c); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Check if the UserID already exists in Admin table
	var exists bool
	query := "SELECT EXISTS(SELECT 1 FROM Admin WHERE UserID = ?)"
	err := h.db.QueryRow(query, c.UserID).Scan(&exists)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if exists {
		http.Error(w, "UserID already exists in Admin", http.StatusBadRequest)
		return
	}

	// Check if the UserID already exists in Customer table
	query = "SELECT EXISTS(SELECT 1 FROM Customer WHERE UserID = ?)"
	err = h.db.QueryRow(query, c.UserID).Scan(&exists)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if exists {
		http.Error(w, "UserID already exists in Customer", http.StatusBadRequest)
		return
	}

	query = `INSERT INTO Customer (UserID, LoyaltyPoints) VALUES (?, ?)`
	_, err = h.db.Exec(query, c.UserID, c.LoyaltyPoints)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	w.Header().Set("Content-Type", "application/json")
	w.Write([]byte(`{"message": "Customer created successfully"}`))
}

func (h *CustomerHandler) GetCustomer(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := strconv.Atoi(vars["id"])
	if err != nil {
		http.Error(w, "Invalid customer ID", http.StatusBadRequest)
		return
	}

	var c models.Customer
	query := "SELECT UserID, LoyaltyPoints FROM Customer WHERE UserID = ?"
	if err := h.db.QueryRow(query, id).Scan(&c.UserID, &c.LoyaltyPoints); err != nil {
		if err == sql.ErrNoRows {
			http.Error(w, "Customer not found", http.StatusNotFound)
		} else {
			http.Error(w, err.Error(), http.StatusInternalServerError)
		}
		return
	}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(c); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}

func (h *CustomerHandler) UpdateCustomer(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := strconv.Atoi(vars["id"])
	if err != nil {
		http.Error(w, "Invalid customer ID", http.StatusBadRequest)
		return
	}

	var c models.Customer
	if err := json.NewDecoder(r.Body).Decode(&c); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	if err := customerValidate.Struct(c); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	query := `UPDATE Customer SET LoyaltyPoints = ? WHERE UserID = ?`
	result, err := h.db.Exec(query, c.LoyaltyPoints, id)
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
		http.Error(w, "Customer ID not found", http.StatusNotFound)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Header().Set("Content-Type", "application/json")
	w.Write([]byte(`{"message": "Customer updated successfully"}`))
}

func (h *CustomerHandler) DeleteCustomer(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := strconv.Atoi(vars["id"])
	if err != nil {
		http.Error(w, "Invalid customer ID", http.StatusBadRequest)
		return
	}

	query := "DELETE FROM Customer WHERE UserID = ?"
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
		http.Error(w, "Customer ID not found", http.StatusNotFound)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}
