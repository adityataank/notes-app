package db

import (
	"database/sql"

	"github.com/adityataank/notes-app/pkg/logger"
	_ "github.com/lib/pq"
)

type DB struct {
	Db   *sql.DB
	User *UserReopsitory
	Note *NoteRepository
}

var Storage = &DB{}

func (db *DB) InitDB(dsn string) error {
	database, err := sql.Open("postgres", dsn)
	if err != nil {
		return err
	}
	err = database.Ping()
	if err != nil {
		return err
	}
	logger.InfoLog("DB connected successfully!")
	Storage.Db = database
	return nil
}

func (db *DB) CloseDB() {
	if Storage != nil {
		err := Storage.Db.Close()
		if err != nil {
			logger.ServerError(err)
		}
		logger.InfoLog("Databse connection closed successfully!")
	} else {
		logger.InfoLog("Databse is NIL")
	}
}
