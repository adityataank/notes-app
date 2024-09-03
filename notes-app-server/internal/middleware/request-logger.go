package middleware

import (
	"fmt"
	"net/http"

	"github.com/adityataank/notes-app/pkg/logger"
)

func RequestLogger(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		var logRequest = fmt.Sprintf("%s %s", r.Method, r.URL)
		logger.RequestLog(logRequest)
		next.ServeHTTP(w, r)
	})
}
