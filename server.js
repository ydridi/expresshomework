const express = require("express");
const path = require("path");
const db = require("./db.json");
const fs = require("fs");

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", function(req,res){
  res.sendFile(path.resolve('.')+"/index.html");
});

app.get("/styles.css", function(req,res){
  res.sendFile(path.resolve('.')+"/styles.css");
});
app.get("/index.js", function(req, res) {
 res.sendFile(path.resolve('.')+ "/index.js");
});

app.get("/notes", function(req, res) {
    res.sendFile(path.resolve('.')+ "/notes.html");
  });
  
app.get("/api/notes", function(req, res) {
    res.json(db);
  });
app.post("/api/notes", function(req, res){
  req.body.id = db.length;
  db.push(req.body);
  fs.writeFileSync(path.resolve('.')+"/db.json", JSON.stringify(db)); 
    res.json(db);

});
app.delete("/api/notes/:id", function(req, res){
  db.splice(req.params.id, 1);
  fs.writeFileSync(path.resolve('.')+"/db.json", JSON.stringify(db)); 
    res.json(db); 
});

//This will allow the script to be used on the web pages to be loaded into the browser: 

app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});