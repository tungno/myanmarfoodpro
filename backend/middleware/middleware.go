package middleware

import (
	"MyanmarFood/token"
	"net/http"
	"strings"
	"time"

	"github.com/dgrijalva/jwt-go"
)

func JWTAuth(secret string) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			authHeader := r.Header.Get("Authorization")
			if authHeader == "" {
				http.Error(w, "Authorization header required", http.StatusUnauthorized)
				return
			}

			bearerToken := strings.Split(authHeader, " ")
			if len(bearerToken) != 2 || bearerToken[0] != "Bearer" {
				http.Error(w, "Invalid token format", http.StatusUnauthorized)
				return
			}

			tokenString := bearerToken[1]
			if token.GetBlacklist().IsBlacklisted(tokenString) {
				http.Error(w, "Token has been blacklisted", http.StatusUnauthorized)
				return
			}

			token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
				return []byte(secret), nil
			})

			if err != nil {
				http.Error(w, "Invalid token", http.StatusUnauthorized)
				return
			}

			if !token.Valid {
				http.Error(w, "Invalid token", http.StatusUnauthorized)
				return
			}

			claims, ok := token.Claims.(jwt.MapClaims)
			if !ok || !token.Valid {
				http.Error(w, "Invalid token claims", http.StatusUnauthorized)
				return
			}

			lastActivity := int64(claims["lastActivity"].(float64))
			if time.Now().Sub(time.Unix(lastActivity, 0)) > 30*time.Minute {
				http.Error(w, "Session has expired due to inactivity", http.StatusUnauthorized)
				return
			}

			// Update last activity timestamp
			claims["lastActivity"] = time.Now().Unix()

			// Generate new token with updated last activity timestamp
			newToken := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
			newTokenString, err := newToken.SignedString([]byte(secret))
			if err != nil {
				http.Error(w, "Failed to refresh token", http.StatusInternalServerError)
				return
			}

			w.Header().Set("Authorization", "Bearer "+newTokenString)

			next.ServeHTTP(w, r)
		})
	}
}
