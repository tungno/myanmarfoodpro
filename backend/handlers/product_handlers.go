// /backend/handlers/product_handlers.go
package handlers

import (
	"MyanmarFood/models"
	"database/sql"
	"encoding/json"
	"fmt"
	"github.com/go-playground/validator/v10"
	"github.com/gorilla/mux"
	"io"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"strconv"
)

type ProductHandler struct {
	db              *sql.DB
	productValidate *validator.Validate
}

var productValidate *validator.Validate

func init() {
	productValidate = validator.New()
}

func NewProductHandler(db *sql.DB) *ProductHandler {
	return &ProductHandler{
		db:              db,
		productValidate: validator.New(), // Initialize the validator here
	}
}

// CreateProduct handles the POST /products request
func (h *ProductHandler) CreateProduct(w http.ResponseWriter, r *http.Request) {
	log.Println("CreateProduct endpoint hit.")
	var product models.Product
	if err := json.NewDecoder(r.Body).Decode(&product); err != nil {
		log.Printf("Error decoding product data: %v", err)
		http.Error(w, "Invalid request payload", http.StatusBadRequest)
		return
	}

	log.Println("Product decoded:", product)

	if err := h.productValidate.Struct(product); err != nil {
		log.Printf("Product validation failed: %v", err)
		http.Error(w, "Validation error: "+err.Error(), http.StatusBadRequest)
		return
	}

	query := `INSERT INTO product (name, description, category, stock_quantity, image, new_price, old_price) VALUES (?, ?, ?, ?, ?, ?, ?)`
	_, err := h.db.Exec(query, product.Name, product.Description, product.Category, product.StockQuantity, product.Image, product.NewPrice, product.OldPrice)
	if err != nil {
		log.Printf("Error inserting product into database: %v", err)
		http.Error(w, "Failed to add product", http.StatusInternalServerError)
		return
	}

	log.Println("Product inserted successfully.")

	w.WriteHeader(http.StatusCreated)
	w.Header().Set("Content-Type", "application/json")
	jsonResponse := map[string]interface{}{
		"success": true,
		"message": "Product created successfully",
	}
	if err := json.NewEncoder(w).Encode(jsonResponse); err != nil {
		http.Error(w, "Failed to add product: "+err.Error(), http.StatusInternalServerError)
	}
}

// GetProduct handles the GET /products and GET /products/{id} requests
func (h *ProductHandler) GetProduct(w http.ResponseWriter, r *http.Request) {
	var products []models.Product
	vars := mux.Vars(r)
	id, idPresent := vars["id"]

	query := "SELECT id, name, description, category, stock_quantity, image, new_price, old_price FROM product"

	if idPresent {
		query += " WHERE id = ?"
		row := h.db.QueryRow(query, id)

		var product models.Product
		err := row.Scan(&product.ID, &product.Name, &product.Description, &product.Category, &product.StockQuantity, &product.Image, &product.NewPrice, &product.OldPrice)
		if err == sql.ErrNoRows {
			http.Error(w, "Product not found", http.StatusNotFound)
			return
		} else if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		if err := json.NewEncoder(w).Encode(product); err != nil {
			http.Error(w, "Failed to fetch a product: "+err.Error(), http.StatusInternalServerError)
		}
	} else {
		rows, err := h.db.Query(query)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		defer rows.Close()

		for rows.Next() {
			var product models.Product
			if err := rows.Scan(&product.ID, &product.Name, &product.Description, &product.Category, &product.StockQuantity, &product.Image, &product.NewPrice, &product.OldPrice); err != nil {
				http.Error(w, err.Error(), http.StatusInternalServerError)
				return
			}
			products = append(products, product)
		}

		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		if err := json.NewEncoder(w).Encode(products); err != nil {
			http.Error(w, "Failed to fetch products: "+err.Error(), http.StatusInternalServerError)
		}
	}
}

// UpdateProduct handles the PUT /products/{id} request
func (h *ProductHandler) UpdateProduct(w http.ResponseWriter, r *http.Request) {
	var product models.Product
	vars := mux.Vars(r)
	id, _ := strconv.Atoi(vars["id"])

	if err := json.NewDecoder(r.Body).Decode(&product); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	if err := productValidate.Struct(product); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	query := "UPDATE product SET name = ?, description = ?, category = ?, stock_quantity = ?, image = ?, new_price = ?, old_price = ? WHERE id = ?"
	_, err := h.db.Exec(query, product.Name, product.Description, product.Category, product.StockQuantity, product.Image, product.NewPrice, product.OldPrice, id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	if err := json.NewEncoder(w).Encode(product); err != nil {
		http.Error(w, "Failed to update a product: "+err.Error(), http.StatusInternalServerError)
	}
}

// DeleteProduct handles the DELETE /products/{id} request
func (h *ProductHandler) DeleteProduct(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, _ := strconv.Atoi(vars["id"])

	query := "DELETE FROM product WHERE id = ?"
	_, err := h.db.Exec(query, id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}

// ImageUploadHandler handles the POST /upload request
func (h *ProductHandler) ImageUploadHandler(w http.ResponseWriter, r *http.Request) {
	file, header, err := r.FormFile("product")
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	defer file.Close()

	// Create the upload directory if it doesn't exist
	uploadDir := "./upload/images"
	if _, err := os.Stat(uploadDir); os.IsNotExist(err) {
		os.MkdirAll(uploadDir, os.ModePerm)
	}

	// Generate the file path
	fileName := fmt.Sprintf("%s_%d%s", "product", header.Size, filepath.Ext(header.Filename))
	filePath := filepath.Join(uploadDir, fileName)

	// Write the file to the upload directory
	out, err := os.Create(filePath)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer out.Close()

	_, err = io.Copy(out, file)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	res := map[string]interface{}{
		"success":   1,
		"image_url": fmt.Sprintf("http://34.79.169.45:8080/images/%s", fileName),
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	if err := json.NewEncoder(w).Encode(res); err != nil {
		http.Error(w, "Failed at creating an image", http.StatusInternalServerError)
	}
}
