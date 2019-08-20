require ('./config/config');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json
app.use(bodyParser.json());

// Configuración global de rutas
app.use(require('./routes/index'));

// habilitar la carpeta public
// con path.resolve() solucionaoms la cadena de ubicación de la carpeta
app.use(express.static(path.resolve(__dirname, '../public')));

mongoose.connect(process.env.urlBD, {useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false }, (err, res) => {
  if (err) {
      throw err;
  } else {
      console.log('BBDD ONLINE');
  }
});


app.listen(process.env.PORT, () => {
    console.log('Escuchando en puerto:', process.env.PORT);
});