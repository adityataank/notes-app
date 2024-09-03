package helpers

import (
	"encoding/json"
	"net/http"

	"github.com/adityataank/notes-app/pkg/logger"
)

func ReadJSON(w http.ResponseWriter, r *http.Request, payload any) error {
	err := json.NewDecoder(r.Body).Decode(payload)
	if err != nil {
		WriteError(w, http.StatusBadRequest, "Failed to parse payload")
		return err
	}
	return nil
}

func WriteJSON(w http.ResponseWriter, statusCode int, data any) {
	w.Header().Add("Content-Type", "application/json")
	w.WriteHeader(statusCode)
	err := json.NewEncoder(w).Encode(data)
	if err != nil {
		logger.ServerError(err)
	}
}

func WriteError(w http.ResponseWriter, statusCode int, err string) {
	errorBody := map[string]string{"error": err}
	WriteJSON(w, statusCode, errorBody)
}
