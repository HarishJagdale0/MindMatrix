import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

let students: any[] = [];

app.get("/students", (req, res) => res.json(students));

app.post("/students", (req, res) => {
  students.push(req.body);
  res.send("Student Added");
});

app.put("/students/:index", (req, res) => {
  students[+req.params.index] = req.body;
  res.send("Student Updated");
});

app.delete("/students/:index", (req, res) => {
  students.splice(+req.params.index, 1);
  res.send("Student Deleted");
});

app.listen(5000, () => console.log("TS Server running"));

