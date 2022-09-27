const express = require('express');
const mongoose = require('mongoose');
const nunjucks = require('nunjucks');

// Enrutadores
const libros = require(__dirname + '/routers/libros');

// Conectar con BD en Mongo 
mongoose.connect('mongodb://localhost:27017/libros', 
    {useNewUrlParser: true, useUnifiedTopology: true});

// Inicializar Express
let app = express();

nunjucks.configure('views', {
    autoescape: true,
    express: app
   });

// Cargar middleware para peticiones POST y PUT
// y enrutadores
app.set('view engine', 'njk');
app.use(express.json());
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use('/', libros);

// Puesta en marcha del servidor
app.listen(8080);