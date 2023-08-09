const express = require('express')
const path = require('path');
const app = express()
const port = 3000

// Devuelve el text-ajax
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/test-post.html'));
})

// Recibiendo por GET
app.post('/login', (req, res) => {
  var email = req.query.email;
  var password = req.query.password;
  console.log(email);
  console.log(password);

  if (email == "a@a.com" && password == "1") {
    // Email y contraseña validas
    res.send({"estado":"exito"});
  } else {
    // Email y contraseña incorrecta
    res.send({"estado":"invalido"});
  }
  
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})