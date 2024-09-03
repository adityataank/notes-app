package router

import (
	"net/http"

	"github.com/adityataank/notes-app/internal/handler"
)

func HealthCheckRouter(mux *http.ServeMux) {

	mux.HandleFunc("GET /health-check", handler.HealthCheck)

}
