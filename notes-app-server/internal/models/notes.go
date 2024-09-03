package models

import "time"

type Notes struct {
	Id        int       `json:"id"`
	Title     string    `json:"title"`
	Content   string    `json:"content"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
	UserId    int       `json:"-"`
}

func (n *Notes) ValidateMandatoryFields() bool {
	return n.Title != ""
}
