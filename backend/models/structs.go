package models

import (
	"database/sql"
	"time"
)

type User struct {
	UserID      int           `json:"UserID"`
	FirstName   string        `json:"FirstName"`
	LastName    string        `json:"LastName"`
	Email       string        `json:"Email"`
	Password    string        `json:"Password"`
	PhoneNumber string        `json:"PhoneNumber"`
	LastLogin   time.Time     `json:"LastLogin"`
	DateCreated time.Time     `json:"DateCreated"`
	IsActive    bool          `json:"IsActive"`
	IsDeleted   bool          `json:"IsDeleted"`
	CreatedBy   sql.NullInt64 `json:"CreatedBy"`
	UpdatedBy   sql.NullInt64 `json:"UpdatedBy"`
}

type Customer struct {
	UserID        int `json:"UserID"`
	LoyaltyPoints int `json:"LoyaltyPoints"`
}

type Admin struct {
	UserID int    `json:"UserID"`
	Role   string `json:"Role"`
}

type Address struct {
	AddressID   int       `json:"AddressID"`
	UserID      int       `json:"UserID"`
	Street      string    `json:"Street"`
	City        string    `json:"City"`
	State       string    `json:"State"`
	PostalCode  string    `json:"PostalCode"`
	Country     string    `json:"Country"`
	IsDefault   bool      `json:"IsDefault"`
	AddressType string    `json:"AddressType"`
	CreatedAt   time.Time `json:"CreatedAt"`
	UpdatedAt   time.Time `json:"UpdatedAt"`
}
