// /backend/models/structs.go
package models

type Product struct {
	ID            int     `json:"id"`
	Name          string  `json:"name" validate:"required"`
	Description   string  `json:"description"`
	Category      string  `json:"category"`
	StockQuantity int     `json:"stock_quantity"`
	Image         string  `json:"image"`
	NewPrice      float64 `json:"new_price" validate:"required,gt=0"`
	OldPrice      float64 `json:"old_price"`
}

type User struct {
	ID       int    `json:"id"`
	Name     string `json:"name" validate:"required"`
	Email    string `json:"email" validate:"required,email"`
	Password string `json:"password" validate:"required"`
	CartData string `json:"cart_data"`
	Date     string `json:"date"`
}
