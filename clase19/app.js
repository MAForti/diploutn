const express = require('express')
const path = require('path');
const app = express()
const mysql = require('mysql');
const bodyParser = require('body-parser');
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

// Habilita capturar datos por POST
app.use(bodyParser.urlencoded({ extended: true }));

// Devuelve el login.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/login.html'));
})

// Recibiendo por POST
app.post('/login', (req, res) => {
  var email = req.body.email;
  var password = req.body.password;
  console.log(email);
  console.log(password);

  if (email == "a@a.com" && password == "1") {
    // Email y contraseña validas
    res.sendFile(path.join(__dirname, '/panel.html'));
  } else {
    // Email y contraseña incorrecta
    res.sendFile(path.join(__dirname, '/login.html'));
  }
  
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})