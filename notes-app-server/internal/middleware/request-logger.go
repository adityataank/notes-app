package middleware

import (
	"fmt"
	"net/http"
	"time"

	"github.com/adityataank/notes-app/pkg/logger"
)

func RequestLogger(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		startTime := time.Now()

		var logRequest = fmt.Sprintf("%s %s", r.Method, r.URL)
		logger.RequestLog(logRequest)
		next.ServeHTTP(w, r)

		fmt.Printf("Request processed in %s\n\n", time.Since(startTime)) // Time taken to process the request.
	})
}
