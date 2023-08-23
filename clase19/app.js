const express = require('express')
const path = require('path');
const app = express()
const mysql = require('mysql');
const port = 3000

// Creamos la conexion con MySQL
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: 'utn'
});

// Probamos si la conexion es correcta
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");

  // Una vez que estoy conectado, ejecutamos una consulta SQL
  var sql = "SELECT * FROM usuarios;";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Result: " + JSON.stringify(result));
  });

});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})