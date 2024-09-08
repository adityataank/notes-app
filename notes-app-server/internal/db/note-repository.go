package db

import (
	"time"

	"github.com/adityataank/notes-app/internal/models"
)

type NoteRepository struct{}

func (repo *NoteRepository) GetNotes(userId int) ([]*models.Notes, error) {
	var notes []*models.Notes
	stmt := `SELECT id, title, content, created_at, updated_at FROM "Notes" WHERE user_id = $1 ORDER BY updated_at DESC`
	rows, err := Storage.Db.Query(stmt, userId)
	if err != nil {
		return nil, err
	}
	for rows.Next() {
		note := &models.Notes{}
		err := rows.Scan(&note.Id, &note.Title, &note.Content, &note.CreatedAt, &note.UpdatedAt)
		if err != nil {
			return nil, err
		}
		notes = append(notes, note)
	}
	defer rows.Close()
	return notes, nil
}

func (repo *NoteRepository) CreateNote(notesPayload *models.Notes, userId int) error {
	stmt := `INSERT INTO "Notes" (title, content, user_id) VALUES($1, $2, $3)`
	_, err := Storage.Db.Exec(stmt, notesPayload.Title, notesPayload.Content, userId)
	if err != nil {
		return err
	}
	return nil
}

func (repo *NoteRepository) GetNoteById(id int, userId int) (*models.Notes, error) {
	note := &models.Notes{}

	stmt := `SELECT id, title, content, created_at, updated_at FROM "Notes" WHERE id = $1 AND user_id = $2`

	row := Storage.Db.QueryRow(stmt, id, userId)

	err := row.Scan(&note.Id, &note.Title, &note.Content, &note.CreatedAt, &note.UpdatedAt)

	if err != nil {
		return nil, err
	}

	return note, nil
}

func (repo *NoteRepository) UpdateNoteById(notesPayload *models.Notes, id int, userId int) error {
	stmt := `UPDATE "Notes" SET title = $1, content = $2, updated_at = $3 WHERE id = $4 AND user_id = $5`
	_, err := Storage.Db.Exec(stmt, notesPayload.Title, notesPayload.Content, time.Now(), id, userId)
	if err != nil {
		return err
	}
	return nil
}

func (repo *NoteRepository) DeleteNoteById(id int, userId int) error {
	stmt := `DELETE FROM "Notes" WHERE id = $1 AND user_id = $2`
	_, err := Storage.Db.Exec(stmt, id, userId)
	if err != nil {
		return err
	}
	return nil
}

func (repo *NoteRepository) SearchNotes(query string, userId int) ([]*models.Notes, error) {
	var notes []*models.Notes
	stmt := `SELECT id, title, content, created_at, updated_at FROM "Notes" WHERE user_id = $1 and text_search @@ to_tsquery('english', $2);`
	rows, err := Storage.Db.Query(stmt, userId, query)
	if err != nil {
		return nil, err
	}

	for rows.Next() {
		note := &models.Notes{}
		err := rows.Scan(&note.Id, &note.Title, &note.Content, &note.CreatedAt, &note.UpdatedAt)
		if err != nil {
			return nil, err
		}
		notes = append(notes, note)
	}

	defer rows.Close()
	return notes, nil
}
