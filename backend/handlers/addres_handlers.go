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

type AddressHandler struct {
	db *sql.DB
}

var addressValidate *validator.Validate

func init() {
	addressValidate = validator.New()
}

func NewAddressHandler(db *sql.DB) *AddressHandler {
	return &AddressHandler{db: db}
}

func (h *AddressHandler) GetAddresses(w http.ResponseWriter, r *http.Request) {
	rows, err := h.db.Query("SELECT AddressID, UserID, Street, City, State, PostalCode, Country, IsDefault, AddressType, CreatedAt, UpdatedAt FROM Address")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	addresses := []models.Address{}
	for rows.Next() {
		var a models.Address
		var createdAt, updatedAt []byte
		if err := rows.Scan(&a.AddressID, &a.UserID, &a.Street, &a.City, &a.State, &a.PostalCode, &a.Country, &a.IsDefault, &a.AddressType, &createdAt, &updatedAt); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		a.CreatedAt, err = time.Parse("2006-01-02 15:04:05", string(createdAt))
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
		}
		a.UpdatedAt, err = time.Parse("2006-01-02 15:04:05", string(updatedAt))
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
		}
		addresses = append(addresses, a)
	}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(addresses); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}

func (h *AddressHandler) CreateAddress(w http.ResponseWriter, r *http.Request) {
	var a models.Address
	if err := json.NewDecoder(r.Body).Decode(&a); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	if err := addressValidate.Struct(a); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	query := `INSERT INTO Address (UserID, Street, City, State, PostalCode, Country, IsDefault, AddressType, CreatedAt, UpdatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
	now := time.Now()
	result, err := h.db.Exec(query, a.UserID, a.Street, a.City, a.State, a.PostalCode, a.Country, a.IsDefault, a.AddressType, now, now)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	id, err := result.LastInsertId()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	a.AddressID = int(id)
	w.WriteHeader(http.StatusCreated)
	w.Header().Set("Content-Type", "application/json")
	w.Write([]byte(`{"message": "Address created successfully"}`))
}

func (h *AddressHandler) GetAddress(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := strconv.Atoi(vars["id"])
	if err != nil {
		http.Error(w, "Invalid address ID", http.StatusBadRequest)
		return
	}

	var a models.Address
	var createdAt, updatedAt []byte
	query := "SELECT AddressID, UserID, Street, City, State, PostalCode, Country, IsDefault, AddressType, CreatedAt, UpdatedAt FROM Address WHERE AddressID = ?"
	if err := h.db.QueryRow(query, id).Scan(&a.AddressID, &a.UserID, &a.Street, &a.City, &a.State, &a.PostalCode, &a.Country, &a.IsDefault, &a.AddressType, &createdAt, &updatedAt); err != nil {
		if err == sql.ErrNoRows {
			http.Error(w, "Address not found", http.StatusNotFound)
		} else {
			http.Error(w, err.Error(), http.StatusInternalServerError)
		}
		return
	}
	a.CreatedAt, err = time.Parse("2006-01-02 15:04:05", string(createdAt))
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
	a.UpdatedAt, err = time.Parse("2006-01-02 15:04:05", string(updatedAt))
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(a); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}

func (h *AddressHandler) UpdateAddress(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := strconv.Atoi(vars["id"])
	if err != nil {
		http.Error(w, "Invalid address ID", http.StatusBadRequest)
		return
	}

	var a models.Address
	if err := json.NewDecoder(r.Body).Decode(&a); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	if err := addressValidate.Struct(a); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	query := `UPDATE Address SET UserID = ?, Street = ?, City = ?, State = ?, PostalCode = ?, Country = ?, IsDefault = ?, AddressType = ?, UpdatedAt = ? WHERE AddressID = ?`
	now := time.Now()
	_, err = h.db.Exec(query, a.UserID, a.Street, a.City, a.State, a.PostalCode, a.Country, a.IsDefault, a.AddressType, now, id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Header().Set("Content-Type", "application/json")
	w.Write([]byte(`{"message": "Address updated successfully"}`))
}

func (h *AddressHandler) DeleteAddress(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := strconv.Atoi(vars["id"])
	if err != nil {
		http.Error(w, "Invalid address ID", http.StatusBadRequest)
		return
	}

	query := "DELETE FROM Address WHERE AddressID = ?"
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
		http.Error(w, "Address not found", http.StatusNotFound)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}
