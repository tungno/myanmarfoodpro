package handlers

import (
	"MyanmarFood/models"
	"database/sql"
	"encoding/json"
	"github.com/go-playground/validator/v10"
	"log"
	"net/http"
)

type ProductforyouHandler struct {
	db                     *sql.DB
	ProductforyouValidator *validator.Validate
}

func NewProductforyouHandler(db *sql.DB) *ProductforyouHandler {
	return &ProductforyouHandler{
		db:                     db,
		ProductforyouValidator: validator.New(),
	}
}

// ProductForYou handles the endpoint to get the latest products from each category.
func (h *ProductforyouHandler) ProductForYou(w http.ResponseWriter, r *http.Request) {
	log.Println("Product For You endpoint hit.")
	w.Header().Set("Content-Type", "application/json")

	categories := []string{"seafood", "farmfood", "traditionalfood", "snackfood"}
	var products []models.Product

	for _, category := range categories {
		// Query to retrieve the latest 2 products for each category
		rows, err := h.db.Query(`
			SELECT id, name, description, category, stock_quantity, image, new_price, old_price 
			FROM product 
			WHERE category = ? 
			ORDER BY id DESC 
			LIMIT 2`, category)
		if err != nil {
			log.Printf("Error fetching products for category %s: %v", category, err)
			http.Error(w, "Failed to retrieve products", http.StatusInternalServerError)
			return
		}
		defer rows.Close()

		for rows.Next() {
			var product models.Product
			if err := rows.Scan(&product.ID, &product.Name, &product.Description, &product.Category, &product.StockQuantity, &product.Image, &product.NewPrice, &product.OldPrice); err != nil {
				log.Printf("Error scanning product: %v", err)
				http.Error(w, "Failed to parse products", http.StatusInternalServerError)
				return
			}

			// Validate the fetched product
			if err := h.ProductforyouValidator.Struct(product); err != nil {
				log.Printf("Validation error for product: %v", err)
				http.Error(w, "Product validation failed", http.StatusInternalServerError)
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
	}

	// Send the response
	if err := json.NewEncoder(w).Encode(products); err != nil {
		http.Error(w, "Failed to send response", http.StatusInternalServerError)
	}
}
