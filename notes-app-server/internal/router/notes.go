package router

import (
	"net/http"

	"github.com/adityataank/notes-app/internal/handler"
	"github.com/adityataank/notes-app/internal/middleware"
)

func NotesRouter(mux *http.ServeMux) {

	notesMux := http.NewServeMux()

	notesMux.HandleFunc("GET /notes", handler.GetAllNotes)
	notesMux.HandleFunc("POST /notes", handler.CreateNote)
	notesMux.HandleFunc("GET /notes/{id}", handler.GetNote)

	mux.Handle("/notes", middleware.AuthMiddleware(notesMux))
	mux.Handle("/notes/", middleware.AuthMiddleware(notesMux))

}
