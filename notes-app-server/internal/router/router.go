package router

import (
	"net/http"

	"github.com/adityataank/notes-app/internal/middleware"
)

func Router() http.Handler {
	mux := http.NewServeMux()

	v1 := http.NewServeMux()

	// health check
	HealthCheckRouter(v1)

	// auth
	AuthRouter(v1)

	// notes
	NotesRouter(v1)

	mux.Handle("/api/v1/", http.StripPrefix("/api/v1", v1))

	return middleware.ApiAuthMiddleware(middleware.RequestLogger(mux))
}
