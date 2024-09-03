package logger

import (
	"fmt"
	"log"
	"os"
)

const (
	reset  = "\033[0m"
	red    = "\033[31m"
	yellow = "\033[33m"
)

func logMessage(outWriter *os.File, level string, message string, color string, hideFilename bool) {
	prefix := fmt.Sprintf("%s: ", color+level)
	var fileName = log.Lshortfile
	if hideFilename {
		fileName = 0
	}
	log.New(outWriter, prefix, log.Ldate|log.Ltime|fileName).Output(3, message+reset+"\n\n")
}

func InfoLog(message string) {
	logMessage(os.Stdout, "Info", message, "", false)
}

func ErrorLog(message string) {
	logMessage(os.Stderr, "Error", message, red, false)
}

func RequestLog(message string) {
	logMessage(os.Stdout, "Request received", message, yellow, true)
}

func ServerError(err error) {
	logMessage(os.Stderr, "Server Error", err.Error(), red, false)
	os.Exit(1)
}
