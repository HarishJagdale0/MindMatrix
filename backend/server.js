const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let students = [];

// CREATE
app.post("/students", (req, res) => {
  students.push(req.body);
  res.send("Student Added");
});

// READ
app.get("/students", (req, res) => {
  res.json(students);
});

// UPDATE
app.put("/students/:index", (req, res) => {
  const index = req.params.index;
  students[index] = req.body;
  res.send("Student Updated");
});

// DELETE
app.delete("/students/:index", (req, res) => {
  students.splice(req.params.index, 1);
  res.send("Student Deleted");
});

app.listen(5000, () => {
  console.log("Backend running at http://localhost:5000");
});
