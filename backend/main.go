package main

import (
	"encoding/json"
	"net/http"
	"strconv"
)

type Student struct {
	Name   string `json:"name"`
	Course string `json:"course"`
}

var students []Student

func enableCORS(w http.ResponseWriter) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS")
}

func handler(w http.ResponseWriter, r *http.Request) {
	enableCORS(w)
	if r.Method == "OPTIONS" {
		return
	}

	if r.URL.Path == "/students" {
		if r.Method == "GET" {
			json.NewEncoder(w).Encode(students)
		} else if r.Method == "POST" {
			var s Student
			json.NewDecoder(r.Body).Decode(&s)
			students = append(students, s)
			w.Write([]byte("Student Added"))
		}
		return
	}

	index, _ := strconv.Atoi(r.URL.Path[len("/students/"):])

	if r.Method == "PUT" {
		json.NewDecoder(r.Body).Decode(&students[index])
		w.Write([]byte("Student Updated"))
	} else if r.Method == "DELETE" {
		students = append(students[:index], students[index+1:]...)
		w.Write([]byte("Student Deleted"))
	}
}

func main() {
	http.HandleFunc("/students", handler)
	http.HandleFunc("/students/", handler)
	http.ListenAndServe(":5000", nil)
}
