import React, { useEffect, useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [students, setStudents] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = () => {
    fetch("http://localhost:5000/students")
      .then(res => res.json())
      .then(data => setStudents(data));
  };

  const saveStudent = () => {
    if (editIndex === null) {
      fetch("http://localhost:5000/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, course })
      }).then(fetchStudents);
    } else {
      fetch(`http://localhost:5000/students/${editIndex}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, course })
      }).then(() => {
        setEditIndex(null);
        fetchStudents();
      });
    }

    setName("");
    setCourse("");
  };

  const editStudent = (student, index) => {
    setName(student.name);
    setCourse(student.course);
    setEditIndex(index);
  };

  const deleteStudent = (index) => {
    fetch(`http://localhost:5000/students/${index}`, {
      method: "DELETE"
    }).then(fetchStudents);
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Student CRUD App</h1>

      <input
        placeholder="Student Name"
        value={name}
        onChange={e => setName(e.target.value)}
      />

      <input
        placeholder="Course"
        value={course}
        onChange={e => setCourse(e.target.value)}
      />

      <button onClick={saveStudent}>
        {editIndex === null ? "Add" : "Update"}
      </button>

      <ul>
        {students.map((s, i) => (
          <li key={i}>
            {s.name} - {s.course}
            <button onClick={() => editStudent(s, i)}>✏️</button>
            <button onClick={() => deleteStudent(i)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
