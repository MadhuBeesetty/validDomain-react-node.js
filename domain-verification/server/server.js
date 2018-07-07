const express = require("express");
const cors = require("cors");
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const app = express();

var mysql = require('mysql');

var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: '',
  database: "mydb"
});

/*
  // creation of database
db.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  db.query("CREATE DATABASE mydb", function (err, result) {
    if (err) throw err;
    console.log("Database created");
  });
});
*/

//creating a table in data base
/*
db.connect(function(err){
  if (err) throw err;
  console.log("connected");
  var sql = "CREATE TABLE domain_verification (id INT, domain VARCHAR(200), description VARCHAR(200), valid_domain VARCHAR(1),datetime TIMESTAMP)";
  db.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});
*/

/*
  //inserting values in database
  */

//fetching data from databse

app.use(cors());

//validating Domain

var Inputdom = '';
var valid ='';
var id = 1;
const filterFun1 = (domain, i=0) => {
  if(i === domain.length){
    filterFun2(domain);
    return;
  };
  if(domain[i] === "w" && domain[i+1] === "w" && domain[i+2] === "w"){
    Inputdom = domain.slice(i+4);
    filterFun2(Inputdom);
    return;
  };
  return filterFun1 (domain, i+1);
};

const filterFun2 = (domain, i=0) => {
  if(i === domain.length){
    Inputdom = domain;
    return;
  };
  if(domain[i] === "/"){
    Inputdom = domain.slice(0, i);
    return;
  };
  return filterFun2(domain, i+1);
};

const UrlExists = (url) => {
  console.log(url);
    var http = new XMLHttpRequest();
    http.open('HEAD', url);
  http.onreadystatechange = function() {
    if (this.readyState == this.DONE) {
      if(this.status == 200){
        valid = "t";
        }else{
        valid = "f";
        };
        };
    };
    http.send();
};

app.get('/sendDomain',(req,res)=>{
  const {Domain,Description} = req.query;
  filterFun1(Domain);
  var checkURL = "https://"+Inputdom;
  UrlExists(checkURL);
  id = id+1;
  db.connect(function(err) {
    if (err) throw err;
    var sql = `INSERT INTO domain_verification (id, domain, description, valid_domain) VALUES ('${id}', '${Inputdom}', '${Description}', '${valid}')`;
    db.query(sql, function (err, result) {
      if (err) throw err;
    });
  });
  res.send('i think you can see me on server');
});

app.get('/getDomain',(req, res) => {
  db.connect(function(err) {
    if (err) throw err;
    db.query("SELECT * FROM domain_verification", function (err, result, fields) {
      console.log(result);
      res.send(result);
    });
  });
});

//to delete entries from the database tables

/*
db.connect(function() {
db.query("DELETE FROM domain_verification WHERE id = 1");
});
*/

app.listen(4000,()=>{
});
