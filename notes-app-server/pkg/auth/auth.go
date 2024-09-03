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

var SecretKey string

func GenerateToken(user *models.User) (string, error) {
	claims := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"user_id": user.ID,
	})
	tokenString, err := claims.SignedString([]byte(SecretKey))
	if err != nil {
		logger.ErrorLog(err.Error())
		return "", err
	}

	return tokenString, nil
}

func VerifyToken(tokenString string) (*Claims, error) {
	claims := &Claims{}
	token, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
		return []byte(SecretKey), nil
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
