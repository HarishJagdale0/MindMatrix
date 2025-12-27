from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

students = []

@app.route("/students", methods=["GET"])
def get_students():
    return jsonify(students)

@app.route("/students", methods=["POST"])
def add_student():
    students.append(request.json)
    return "Student Added"

@app.route("/students/<int:index>", methods=["PUT"])
def update_student(index):
    students[index] = request.json
    return "Student Updated"

@app.route("/students/<int:index>", methods=["DELETE"])
def delete_student(index):
    students.pop(index)
    return "Student Deleted"

app.run(port=5000)
