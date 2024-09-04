package auth

import (
	"fmt"
	"net/http"

	"github.com/adityataank/notes-app/internal/models"
	"github.com/adityataank/notes-app/pkg/constants"
	"github.com/adityataank/notes-app/pkg/logger"
	"github.com/golang-jwt/jwt/v5"
)

type Claims struct {
	UserId int `json:"user_id"`
	jwt.RegisteredClaims
}

type SecretKeys struct {
	JwtKey string
	ApiKey string
}

var Keys = &SecretKeys{}

func GenerateToken(user *models.User) (string, error) {
	claims := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"user_id": user.ID,
	})
	tokenString, err := claims.SignedString([]byte(Keys.JwtKey))
	if err != nil {
		logger.ErrorLog(err.Error())
		return "", err
	}

	return tokenString, nil
}

func VerifyToken(tokenString string) (*Claims, error) {
	claims := &Claims{}
	token, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
		return []byte(Keys.JwtKey), nil
	})

	if err != nil {
		if err == jwt.ErrSignatureInvalid {
			return nil, fmt.Errorf("invalid token signature")
		}
		return nil, err
	}

	if !token.Valid {
		return nil, fmt.Errorf("invalid token")
	}

	return claims, nil
}

func GetUserFromRequest(r *http.Request) int {
	userId := r.Context().Value(constants.CTX_USER_ID)
	return userId.(int)
}

func CheckApiKey(r *http.Request) bool {
	key := r.Header.Get("Api-Key")
	return (key != "" && key == Keys.ApiKey)
}

func EnableCors(w http.ResponseWriter, r *http.Request) bool {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Api-Key, Content-Type, Authorization")
	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return true
	}
	return false
}
