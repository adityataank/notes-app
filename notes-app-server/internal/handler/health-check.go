package handler

import (
	"net/http"

	"github.com/adityataank/notes-app/pkg/helpers"
)

type healthCheck struct {
	Status  string `json:"status"`
	Message string `json:"message"`
}

func HealthCheck(w http.ResponseWriter, r *http.Request) {

	responseBody := &healthCheck{
		Status:  http.StatusText(200),
		Message: "Server is up and runnning",
	}

	helpers.WriteJSON(w, 200, responseBody)
}
