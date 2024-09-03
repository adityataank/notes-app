package helpers

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/adityataank/notes-app/pkg/logger"
)

func ReadJSON(w http.ResponseWriter, r *http.Request, payload any) error {
	err := json.NewDecoder(r.Body).Decode(payload)
	if err != nil {
		WriteError(w, http.StatusBadRequest, "Failed to parse the payload.")
		return err
	}
	return nil
}

func WriteJSON(w http.ResponseWriter, statusCode int, data any) {
	w.Header().Add("Content-Type", "application/json")
	w.WriteHeader(statusCode)
	response := make(map[string]any)
	response["data"] = data
	err := json.NewEncoder(w).Encode(response)
	if err != nil {
		logger.ServerError(err)
	}
}

func WriteError(w http.ResponseWriter, statusCode int, err string) {
	errorBody := map[string]string{"error": err}
	WriteJSON(w, statusCode, errorBody)
}

func WriteSuccessMessage(w http.ResponseWriter, message string) {
	response := map[string]string{"message": message}
	WriteJSON(w, http.StatusOK, response)
}

func GetParamsValue(w http.ResponseWriter, r *http.Request, key string) (int, error) {
	id, err := strconv.Atoi(r.PathValue(key))
	if err != nil {
		logger.ErrorLog(err.Error())
		WriteError(w, http.StatusInternalServerError, "Failed to parse the query params.")
		return 0, err
	}
	return id, nil
}
