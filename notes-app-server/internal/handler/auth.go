package handler

import (
	"database/sql"
	"errors"
	"fmt"
	"net/http"

	"github.com/adityataank/notes-app/internal/db"
	"github.com/adityataank/notes-app/internal/models"
	"github.com/adityataank/notes-app/pkg/auth"
	"github.com/adityataank/notes-app/pkg/constants"
	"github.com/adityataank/notes-app/pkg/helpers"
	"github.com/adityataank/notes-app/pkg/logger"
	"github.com/lib/pq"
	"golang.org/x/crypto/bcrypt"
)

func CreateUser(w http.ResponseWriter, r *http.Request) {
	userPayload := &models.User{}
	err := helpers.ReadJSON(w, r, userPayload)
	if err != nil {
		return
	}
	if !userPayload.ValidateMandatoryFields() {
		helpers.WriteError(w, http.StatusBadRequest, "Mandatory fields can not be empty.")
		return
	}

	err = db.Storage.User.CreateUser(userPayload)
	if err != nil {
		if pqErr, ok := err.(*pq.Error); ok {
			if pqErr.Code == constants.UniqueViolationCode {
				helpers.WriteError(w, http.StatusConflict, fmt.Sprintf("email %s already exists.", userPayload.Email))
			}
		} else {
			logger.ServerError(err)
			helpers.WriteError(w, http.StatusInternalServerError, "Failed to create a new user.")
		}
		return
	}

	helpers.WriteSuccessMessage(w, "User created successfully!")
}

func LoginUser(w http.ResponseWriter, r *http.Request) {
	loginPayload := &models.User{}
	err := helpers.ReadJSON(w, r, loginPayload)
	if err != nil {
		return
	}

	if !loginPayload.ValidateMandatoryFields() {
		helpers.WriteError(w, http.StatusBadRequest, "Mandatory fields can not be empty.")
		return
	}

	user, err := db.Storage.User.GetUserByEmail(loginPayload.Email)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			helpers.WriteError(w, http.StatusNotFound, fmt.Sprintf("User with email %s does not exist.", loginPayload.Email))
		} else {
			helpers.WriteError(w, http.StatusInternalServerError, "Unable to log in.")
		}
		return
	}
	err = bcrypt.CompareHashAndPassword([]byte(user.PasswordHash), []byte(loginPayload.PasswordPlain))
	if err != nil {
		helpers.WriteError(w, http.StatusUnauthorized, "Password did not match with this email.")
		return
	}
	token, err := auth.GenerateToken(user)
	if err != nil {
		helpers.WriteError(w, http.StatusInternalServerError, "Failed to generate token.")
		return
	}

	response := make(map[string]string)
	response["message"] = "Logged in successfully!"
	response["token"] = token
	helpers.WriteJSON(w, http.StatusOK, response)
}
