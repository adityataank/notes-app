package handler

import (
	"database/sql"
	"errors"
	"net/http"
	"strings"

	"github.com/adityataank/notes-app/internal/db"
	"github.com/adityataank/notes-app/internal/models"
	"github.com/adityataank/notes-app/pkg/auth"
	"github.com/adityataank/notes-app/pkg/helpers"
	"github.com/adityataank/notes-app/pkg/logger"
)

func GetNotes(w http.ResponseWriter, r *http.Request) {
	userId := auth.GetUserFromRequest(r)
	notes, err := db.Storage.Note.GetNotes(userId)
	if err != nil {
		helpers.WriteError(w, http.StatusInternalServerError, "Unable to fetch notes.")
		return
	}
	response := map[string]any{"notes": notes}
	helpers.WriteJSON(w, http.StatusOK, response)

}

func CreateNote(w http.ResponseWriter, r *http.Request) {
	notesPayload := &models.Notes{}
	userId := auth.GetUserFromRequest(r)
	err := helpers.ReadJSON(w, r, notesPayload)
	if err != nil {
		return
	}
	if !notesPayload.ValidateMandatoryFields() {
		helpers.WriteError(w, http.StatusBadRequest, "Title can not be empty")
		return
	}
	err = db.Storage.Note.CreateNote(notesPayload, userId)
	if err != nil {
		logger.ErrorLog(err.Error())
		helpers.WriteError(w, http.StatusInternalServerError, "Unable to create a note.")
		return
	}

	helpers.WriteSuccessMessage(w, "Note created successfully!")
}

func GetNote(w http.ResponseWriter, r *http.Request) {
	id, err := helpers.GetParamsValue(w, r, "id")
	if err != nil {
		return
	}
	userID := auth.GetUserFromRequest(r)

	note, err := db.Storage.Note.GetNoteById(id, userID)

	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			helpers.WriteJSON(w, http.StatusNotFound, note)
		} else {
			logger.ErrorLog(err.Error())
			helpers.WriteError(w, http.StatusInternalServerError, "Unable to fetch note.")
		}
		return
	}

	helpers.WriteJSON(w, http.StatusOK, note)
}

func UpdateNote(w http.ResponseWriter, r *http.Request) {
	id, err := helpers.GetParamsValue(w, r, "id")
	if err != nil {
		return
	}
	userId := auth.GetUserFromRequest(r)
	payload := &models.Notes{}
	err = helpers.ReadJSON(w, r, payload)
	if err != nil {
		return
	}
	err = db.Storage.Note.UpdateNoteById(payload, id, userId)
	if err != nil {
		logger.ErrorLog(err.Error())
		helpers.WriteError(w, http.StatusInternalServerError, "Unable to update this note.")
		return
	}
	helpers.WriteSuccessMessage(w, "Note updated successfully!")
}

func DeleteNote(w http.ResponseWriter, r *http.Request) {
	id, err := helpers.GetParamsValue(w, r, "id")
	if err != nil {
		return
	}
	userId := auth.GetUserFromRequest(r)
	err = db.Storage.Note.DeleteNoteById(id, userId)
	if err != nil {
		logger.ErrorLog(err.Error())
		helpers.WriteError(w, http.StatusInternalServerError, "Unable to delete this note.")
		return
	}
	helpers.WriteSuccessMessage(w, "Note deleted successfully!")
}

func SearchNotes(w http.ResponseWriter, r *http.Request) {
	query := r.URL.Query().Get("query")
	query = strings.ReplaceAll(query, " ", " & ")
	userID := auth.GetUserFromRequest(r)
	notes, err := db.Storage.Note.SearchNotes(query, userID)

	if err != nil {
		helpers.WriteError(w, http.StatusInternalServerError, "Unable to fetch notes.")
		return
	}
	response := map[string]any{"notes": notes}
	helpers.WriteJSON(w, http.StatusOK, response)
}
