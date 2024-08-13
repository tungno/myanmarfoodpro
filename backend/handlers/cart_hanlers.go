package handlers

import (
	"MyanmarFood/middleware"
	"MyanmarFood/models"
	"database/sql"
	"encoding/json"
	"log"
	"net/http"
)

type CartHandler struct {
	db *sql.DB
}

func NewCartHandler(db *sql.DB) *CartHandler {
	return &CartHandler{
		db: db,
	}
}

// AddToCart adds a product to the user's cart.
func (h *CartHandler) AddToCart(w http.ResponseWriter, r *http.Request) {
	user, err := middleware.GetUserFromContext(r.Context())
	if err != nil {
		http.Error(w, "Failed to authenticate user", http.StatusUnauthorized)
		return
	}

	var requestBody struct {
		ItemID int `json:"itemId"`
	}

	if err := json.NewDecoder(r.Body).Decode(&requestBody); err != nil {
		http.Error(w, "Invalid request payload", http.StatusBadRequest)
		return
	}

	var userData models.User
	var cartDataJson string
	if err := h.db.QueryRow("SELECT id, name, email, password, cart_data, date FROM User WHERE id = ?", user.ID).Scan(
		&userData.ID, &userData.Name, &userData.Email, &userData.Password, &cartDataJson, &userData.Date); err != nil {
		http.Error(w, "User not found", http.StatusInternalServerError)
		return
	}

	cartData := parseCartData(cartDataJson)
	cartData[requestBody.ItemID]++
	userData.CartData = cartData

	updatedCartDataJson, err := serializeCartData(cartData)
	if err != nil {
		http.Error(w, "Failed to serialize cart data", http.StatusInternalServerError)
		return
	}

	_, err = h.db.Exec("UPDATE User SET cart_data = ? WHERE id = ?", updatedCartDataJson, userData.ID)
	if err != nil {
		http.Error(w, "Failed to update cart", http.StatusInternalServerError)
		return
	}

	// Respond with a JSON object
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"message": "Added"})
}

// RemoveFromCart removes a product from the user's cart.
func (h *CartHandler) RemoveFromCart(w http.ResponseWriter, r *http.Request) {
	user, err := middleware.GetUserFromContext(r.Context())
	if err != nil {
		http.Error(w, "Failed to authenticate user", http.StatusUnauthorized)
		return
	}

	var requestBody struct {
		ItemID int `json:"itemId"`
	}

	if err := json.NewDecoder(r.Body).Decode(&requestBody); err != nil {
		http.Error(w, "Invalid request payload", http.StatusBadRequest)
		return
	}

	var userData models.User
	var cartDataJson string
	if err := h.db.QueryRow("SELECT id, name, email, password, cart_data, date FROM User WHERE id = ?", user.ID).Scan(
		&userData.ID, &userData.Name, &userData.Email, &userData.Password, &cartDataJson, &userData.Date); err != nil {
		http.Error(w, "User not found", http.StatusInternalServerError)
		return
	}

	cartData := parseCartData(cartDataJson)
	if cartData[requestBody.ItemID] > 0 {
		cartData[requestBody.ItemID]--
	}

	updatedCartDataJson, err := serializeCartData(cartData)
	if err != nil {
		http.Error(w, "Failed to serialize cart data", http.StatusInternalServerError)
		return
	}

	_, err = h.db.Exec("UPDATE User SET cart_data = ? WHERE id = ?", updatedCartDataJson, userData.ID)
	if err != nil {
		http.Error(w, "Failed to update cart", http.StatusInternalServerError)
		return
	}

	// Respond with a JSON object
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"message": "Removed"})
}

// GetCart retrieves the user's cart data.
func (h *CartHandler) GetCart(w http.ResponseWriter, r *http.Request) {
	user, err := middleware.GetUserFromContext(r.Context())
	if err != nil {
		http.Error(w, "Failed to authenticate user", http.StatusUnauthorized)
		return
	}

	var cartDataJson string
	if err := h.db.QueryRow("SELECT cart_data FROM User WHERE id = ?", user.ID).Scan(&cartDataJson); err != nil {
		http.Error(w, "User not found", http.StatusInternalServerError)
		return
	}

	cartData := parseCartData(cartDataJson)
	json.NewEncoder(w).Encode(cartData)
}

// Helper function to parse cart data stored as JSON string
func parseCartData(cartDataJson string) map[int]int {
	var data map[int]int
	if err := json.Unmarshal([]byte(cartDataJson), &data); err != nil {
		// Log error and return an empty map if parsing fails
		log.Printf("Error parsing cart data: %v", err)
		return make(map[int]int)
	}
	return data
}

// Helper function to serialize cart data to JSON string
func serializeCartData(cartData map[int]int) (string, error) {
	data, err := json.Marshal(cartData)
	if err != nil {
		// Log error if serialization fails
		log.Printf("Error serializing cart data: %v", err)
		return "", err
	}
	return string(data), nil
}
