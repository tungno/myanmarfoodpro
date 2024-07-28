package handlers

import (
	"MyanmarFood/token"
	"net/http"
	"strings"
	"time"

	"github.com/dgrijalva/jwt-go"
)

type LogoutHandler struct {
	secret string
}

func NewLogoutHandler(secret string) *LogoutHandler {
	return &LogoutHandler{secret: secret}
}

func (h *LogoutHandler) Logout(w http.ResponseWriter, r *http.Request) {
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
	tokens, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		return []byte(h.secret), nil
	})

	if err != nil {
		http.Error(w, "Invalid token", http.StatusUnauthorized)
		return
	}

	if claims, ok := tokens.Claims.(jwt.MapClaims); ok && tokens.Valid {
		exp := claims["exp"].(float64)
		expiration := time.Unix(int64(exp), 0)
		token.GetBlacklist().Add(tokenString, expiration)
		w.WriteHeader(http.StatusOK)
		w.Write([]byte(`{"message": "Logged out successfully"}`))
	} else {
		http.Error(w, "Invalid token claims", http.StatusUnauthorized)
	}
}
