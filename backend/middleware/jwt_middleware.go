package middleware

import (
	"context"
	"errors"
	"fmt"
	"github.com/dgrijalva/jwt-go"
	"net/http"
	"os"
)

type key string

const userKey key = "user"

// User represents the data stored in the JWT token.
type User struct {
	ID int `json:"id"`
}

// FetchUserMiddleware is a middleware to fetch user data from the JWT token.
func FetchUserMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		tokenString := r.Header.Get("auth-token")
		if tokenString == "" {
			http.Error(w, "Please authenticate using a valid token", http.StatusUnauthorized)
			return
		}

		jwtSecret := os.Getenv("JWT_SECRET")
		if jwtSecret == "" {
			http.Error(w, "JWT secret is not set", http.StatusInternalServerError)
			return
		}

		token, err := jwt.ParseWithClaims(tokenString, &jwt.MapClaims{}, func(token *jwt.Token) (interface{}, error) {
			if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
				return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
			}
			return []byte(jwtSecret), nil
		})

		if err != nil || !token.Valid {
			http.Error(w, "Please authenticate using a valid token", http.StatusUnauthorized)
			return
		}

		claims, ok := token.Claims.(*jwt.MapClaims)
		if !ok || !token.Valid {
			http.Error(w, "Please authenticate using a valid token", http.StatusUnauthorized)
			return
		}

		userID := int((*claims)["user_id"].(float64)) // Assuming the user_id is stored as a float64
		user := &User{ID: userID}

		// Store user in context
		ctx := context.WithValue(r.Context(), userKey, user)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}

// GetUserFromContext retrieves the user from the request context.
func GetUserFromContext(ctx context.Context) (*User, error) {
	user, ok := ctx.Value(userKey).(*User)
	if !ok {
		return nil, errors.New("unable to get user from context")
	}
	return user, nil
}
