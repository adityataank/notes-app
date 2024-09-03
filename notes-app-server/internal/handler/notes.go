package handler

import (
	"fmt"
	"net/http"

	"github.com/adityataank/notes-app/internal/middleware"
)

func GetAllNotes(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Get all notes")
}

func CreateNote(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Create new note")
}

func GetNote(w http.ResponseWriter, r *http.Request) {
	id := r.PathValue("id")
	userID := r.Context().Value(middleware.CtxUserId)

	fmt.Fprintf(w, "get a note with id: %s for user: %d", id, userID)
}
