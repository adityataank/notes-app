package handler

import (
	"net/http"

	"github.com/adityataank/notes-app/pkg/helpers"
)

func HealthCheck(w http.ResponseWriter, r *http.Request) {

	helpers.WriteSuccessMessage(w, "Server is up and running.")
}
