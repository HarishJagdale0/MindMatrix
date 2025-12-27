const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());

app.post("/login", (req,res)=>{
  const token = jwt.sign({user:"admin"}, "secret");
  res.json({token});
});

app.get("/secure", (req,res)=>{
  res.send("JWT Protected API");
});

app.listen(3000);
