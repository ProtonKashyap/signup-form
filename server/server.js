const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");

const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());

//create database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "form_data",
});

//connect to database
db.connect((err) => {
  if (err) throw err;
  console.log("MySql connected..");
});

//add new user
app.post("/form-data", (req, res) => {
  const sqlInsert = "INSERT INTO users (Name,Email,DOB,Gender,Password,timestamp) VALUES (?,?,?,?,?,?)";
  const  {name,email,dob,gender,password}=req.body;
  db.query(sqlInsert, [name, email,dob,gender,password,Date.now()], (err, result) => {console.log(result)});
});

app.listen(3001, () => {
  console.log("Running on port 3001");
});
