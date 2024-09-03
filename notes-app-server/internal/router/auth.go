package router

import (
	"net/http"

	"github.com/adityataank/notes-app/internal/handler"
)

func AuthRouter(mux *http.ServeMux) {
	mux.HandleFunc("POST /auth/sign-up", handler.CreateUser)
	mux.HandleFunc("POST /auth/sign-in", handler.LoginUser)
}
