/*
Ejercicio de desarrollo de una web con Express, sobre la base de datos
de "libros" utilizada en sesiones anteriores. Se definirán distintas
vistas en Nunjucks para mostrar información de los libros y poderlos
insertar, borrar, etc.
*/

// Carga de librerías
const express = require('express');
const mongoose = require('mongoose');
const nunjucks = require('nunjucks');

// Enrutadores
const libros = require(__dirname + '/routes/libros');
const autores = require(__dirname + '/routes/autores');

// Conectar con BD en Mongo 
mongoose.connect('mongodb://localhost:27017/libros', 
    {useNewUrlParser: true, useUnifiedTopology: true});

// Inicializar Express
let app = express();

// Configuramos motor Nunjucks
nunjucks.configure('views', {
    autoescape: true,
    express: app
});

// Asignación del motor de plantillas
app.set('view engine', 'njk');

// Cargar middleware para peticiones POST y PUT y enrutadores
// Cargamos ahora también la carpeta "public" para el CSS propio, y Bootstrap
app.use(express.json());
app.use('/public', express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use('/libros', libros);
app.use('/autores', autores) // Para la parte opcional

// Puesta en marcha del servidor
app.listen(8080);