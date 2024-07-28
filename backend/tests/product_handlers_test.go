package tests

import (
	"bytes"
	"database/sql"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"MyanmarFood/handlers"
	"MyanmarFood/models"
	"github.com/gorilla/mux"
	"github.com/stretchr/testify/assert"
)

var db *sql.DB

func initDB() {
	var err error
	dsn := "root:@tcp(127.0.0.1:3306)/ecommerce"
	db, err = sql.Open("mysql", dsn)
	if err != nil {
		panic(err)
	}
	if err = db.Ping(); err != nil {
		panic(err)
	}
}

func TestGetProducts(t *testing.T) {
	initDB()
	defer db.Close()

	productHandler := handlers.NewProductHandler(db)

	req, err := http.NewRequest("GET", "/products", nil)
	assert.NoError(t, err)

	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(productHandler.GetProducts)
	handler.ServeHTTP(rr, req)

	assert.Equal(t, http.StatusOK, rr.Code)
}

func TestCreateProduct(t *testing.T) {
	initDB()
	defer db.Close()

	productHandler := handlers.NewProductHandler(db)

	product := models.Product{
		Name:            "Test Product",
		Description:     "This is a test product",
		Price:           100.0,
		StockQuantity:   10,
		BrandID:         1,
		CategoryID:      1,
		ImageURL:        "http://example.com/image.jpg",
		SKU:             "TESTSKU",
		Weight:          1.0,
		Dimensions:      "10x10x10",
		IsActive:        true,
		SupplierID:      1,
		ReorderLevel:    5,
		ReorderQuantity: 10,
		CreatedBy:       1,
		UpdatedBy:       1,
	}

	payload, err := json.Marshal(product)
	assert.NoError(t, err)

	req, err := http.NewRequest("POST", "/products", bytes.NewBuffer(payload))
	assert.NoError(t, err)
	req.Header.Set("Content-Type", "application/json")

	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(productHandler.CreateProduct)
	handler.ServeHTTP(rr, req)

	assert.Equal(t, http.StatusOK, rr.Code)
}

func TestGetProduct(t *testing.T) {
	initDB()
	defer db.Close()

	productHandler := handlers.NewProductHandler(db)

	req, err := http.NewRequest("GET", "/products/1", nil)
	assert.NoError(t, err)

	rr := httptest.NewRecorder()
	router := mux.NewRouter()
	router.HandleFunc("/products/{id}", productHandler.GetProduct).Methods("GET")
	router.ServeHTTP(rr, req)

	assert.Equal(t, http.StatusOK, rr.Code)
}

func TestUpdateProduct(t *testing.T) {
	initDB()
	defer db.Close()

	productHandler := handlers.NewProductHandler(db)

	product := models.Product{
		Name:            "Updated Product",
		Description:     "This is an updated product",
		Price:           150.0,
		StockQuantity:   15,
		BrandID:         2,
		CategoryID:      2,
		ImageURL:        "http://example.com/image_updated.jpg",
		SKU:             "UPDATEDSKU",
		Weight:          1.5,
		Dimensions:      "15x15x15",
		IsActive:        true,
		SupplierID:      2,
		ReorderLevel:    7,
		ReorderQuantity: 15,
		UpdatedBy:       1,
	}

	payload, err := json.Marshal(product)
	assert.NoError(t, err)

	req, err := http.NewRequest("PUT", "/products/1", bytes.NewBuffer(payload))
	assert.NoError(t, err)
	req.Header.Set("Content-Type", "application/json")

	rr := httptest.NewRecorder()
	router := mux.NewRouter()
	router.HandleFunc("/products/{id}", productHandler.UpdateProduct).Methods("PUT")
	router.ServeHTTP(rr, req)

	assert.Equal(t, http.StatusOK, rr.Code)
}

func TestDeleteProduct(t *testing.T) {
	initDB()
	defer db.Close()

	productHandler := handlers.NewProductHandler(db)

	req, err := http.NewRequest("DELETE", "/products/1", nil)
	assert.NoError(t, err)

	rr := httptest.NewRecorder()
	router := mux.NewRouter()
	router.HandleFunc("/products/{id}", productHandler.DeleteProduct).Methods("DELETE")
	router.ServeHTTP(rr, req)

	assert.Equal(t, http.StatusNoContent, rr.Code)
}
