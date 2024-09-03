package models

type User struct {
	ID            int    `json:"id"`
	Name          string `json:"name"`
	Email         string `json:"email"`
	PasswordPlain string `json:"password,omitempty"`
	PasswordHash  string `json:"password_hash"`
	CreatedAt     string `json:"created_at"`
}

func (u *User) ValidateMandatoryFields() bool {
	return u.Email != "" && u.PasswordPlain != ""
}
