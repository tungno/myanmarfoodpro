package handlers

import (
	"MyanmarFood/models"
	"database/sql"
	"encoding/json"
	"log"
	"net/http"

	"github.com/go-playground/validator/v10"
)

type RelatedProductsHandler struct {
	db                      *sql.DB
	relatedProductsValidate *validator.Validate
}

func NewRelatedProductsHandler(db *sql.DB) *RelatedProductsHandler {
	return &RelatedProductsHandler{
		db:                      db,
		relatedProductsValidate: validator.New(),
	}
}

// RelatedProducts handles the endpoint to get related products based on the category.
func (h *RelatedProductsHandler) RelatedProducts(w http.ResponseWriter, r *http.Request) {
	log.Println("Related Products endpoint hit.")
	w.Header().Set("Content-Type", "application/json")

	// Struct to parse the request body
	type RequestBody struct {
		Category string `json:"category" validate:"required"`
	}

	var requestBody RequestBody

	// Decode the JSON request body
	if err := json.NewDecoder(r.Body).Decode(&requestBody); err != nil {
		log.Printf("Error decoding request body: %v", err)
		http.Error(w, "Invalid request payload", http.StatusBadRequest)
		return
	}

	// Validate the request body
	if err := h.relatedProductsValidate.Struct(requestBody); err != nil {
		log.Printf("Request validation failed: %v", err)
		http.Error(w, "Validation error: "+err.Error(), http.StatusBadRequest)
		return
	}

	// Query to retrieve products by category, limiting to 4 results
	rows, err := h.db.Query(`
		SELECT id, name, description, category, stock_quantity, image, new_price, old_price 
		FROM Product 
		WHERE category = ? 
		ORDER BY id DESC 
		LIMIT 4`, requestBody.Category)
	if err != nil {
		log.Printf("Error fetching products for category %s: %v", requestBody.Category, err)
		http.Error(w, "Failed to retrieve products", http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var products []models.Product

	for rows.Next() {
		var product models.Product
		if err := rows.Scan(&product.ID, &product.Name, &product.Description, &product.Category, &product.StockQuantity, &product.Image, &product.NewPrice, &product.OldPrice); err != nil {
			log.Printf("Error scanning product: %v", err)
			http.Error(w, "Failed to parse products", http.StatusInternalServerError)
			return
		}
		products = append(products, product)
	}

	// Check for errors after iterating through rows
	if err := rows.Err(); err != nil {
		log.Printf("Error after iterating through rows: %v", err)
		http.Error(w, "Failed to retrieve products", http.StatusInternalServerError)
		return
	}

	// Send the response
	if err := json.NewEncoder(w).Encode(products); err != nil {
		http.Error(w, "Failed to send response", http.StatusInternalServerError)
	}
}
