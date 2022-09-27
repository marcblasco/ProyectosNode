const express = require('express');
const mongoose = require('mongoose');

// Enrutadores
const libros = require(__dirname + '/routers/libros');

// Conectar con BD en Mongo 
mongoose.connect('mongodb://localhost:27017/libros', 
    {useNewUrlParser: true, useUnifiedTopology: true});

// Inicializar Express
let app = express();

// Cargar middleware para peticiones POST y PUT
// y enrutadores
app.use(express.json());
app.use('/', libros);

// Puesta en marcha del servidor
app.listen(8080);