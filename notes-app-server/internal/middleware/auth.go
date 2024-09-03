package middleware

import (
	"context"
	"net/http"
	"strings"
	"unicode/utf8"

	"github.com/adityataank/notes-app/pkg/auth"
	"github.com/adityataank/notes-app/pkg/constants"
	"github.com/adityataank/notes-app/pkg/helpers"
	"github.com/adityataank/notes-app/pkg/logger"
)

func getTokenValue(header *http.Header) string {
	if utf8.RuneCountInString(header.Get("authorization")) == 0 {
		return ""
	}
	return strings.Split(header.Get("authorization"), " ")[1]
}

func AuthMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		token := getTokenValue(&r.Header)
		if token == "" {
			helpers.WriteError(w, http.StatusUnauthorized, "Unauthorized access")
		} else {
			claims, err := auth.VerifyToken(token)
			if err != nil || claims.UserId == 0 {
				logger.ErrorLog(err.Error())
				helpers.WriteError(w, http.StatusUnauthorized, "Unauthorized access")
				return
			}
			ctx := context.WithValue(r.Context(), constants.CTX_USER_ID, claims.UserId)
			next.ServeHTTP(w, r.WithContext(ctx))
		}
	})
}
