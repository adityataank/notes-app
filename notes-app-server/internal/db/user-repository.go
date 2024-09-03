package db

import (
	"github.com/adityataank/notes-app/internal/models"
	"golang.org/x/crypto/bcrypt"
)

type UserReopsitory struct{}

func (repo *UserReopsitory) CreateUser(user *models.User) error {
	passwordHash, err := bcrypt.GenerateFromPassword([]byte(user.PasswordPlain), 10)
	if err != nil {
		return err
	}
	stmt := `INSERT into "Users" (name, email, password_hash) values ($1, $2, $3)`
	_, err = Storage.Db.Exec(stmt, user.Name, user.Email, passwordHash)
	if err != nil {
		return err
	}
	return nil
}

func (repo *UserReopsitory) GetUserByEmail(email string) (*models.User, error) {
	user := &models.User{}
	stmt := `SELECT id, name, email, password_hash, created_at from "Users" where email = $1`
	row := Storage.Db.QueryRow(stmt, email)
	err := row.Scan(&user.ID, &user.Name, &user.Email, &user.PasswordHash, &user.CreatedAt)
	if err != nil {
		return nil, err
	}
	return user, nil
}
