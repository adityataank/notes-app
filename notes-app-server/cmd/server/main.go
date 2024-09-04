package main

import (
	"flag"
	"fmt"
	"net/http"

	"github.com/adityataank/notes-app/internal/db"
	"github.com/adityataank/notes-app/internal/router"
	"github.com/adityataank/notes-app/pkg/auth"
	"github.com/adityataank/notes-app/pkg/logger"
)

type apiServer struct {
	port int
	env  string
	dsn  string
}

type application struct {
	config apiServer
}

func main() {
	app := &application{}

	// initializing env variables
	app.initVariables()

	// initializing Database connection
	err := db.Storage.InitDB(app.config.dsn)
	if err != nil {
		logger.ServerError(err)
	}
	defer db.Storage.CloseDB()

	// Starting the HTTP server
	server := &http.Server{
		Addr:    fmt.Sprintf(":%d", app.config.port),
		Handler: router.Router(),
	}

	logger.InfoLog(fmt.Sprintf("Server started on port %s", server.Addr))
	err = server.ListenAndServe()
	if err != nil {
		logger.ServerError(err)
	}
}

func (app *application) initVariables() {
	flag.IntVar(&app.config.port, "port", 8000, "Port for server")
	flag.StringVar(&app.config.env, "env", "development", "Environment")
	flag.StringVar(&app.config.dsn, "dsn", "", "DSN for DB")
	flag.StringVar(&auth.Keys.JwtKey, "jwtKey", "", "Secret key for JWT")
	flag.StringVar(&auth.Keys.ApiKey, "apiKey", "", "API key for server")
	flag.Parse()
}
