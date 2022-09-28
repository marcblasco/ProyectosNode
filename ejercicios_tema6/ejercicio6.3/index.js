const express = require('express');
const mongoose = require('mongoose');
const nunjucks = require('nunjucks');
const methodOverride = require('method-override');


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
// motor plantillas
app.set('view engine', 'njk');

// Cargar middleware para peticiones POST y PUT
// y enrutadores

app.use(express.json());
app.use(express.urlencoded());
app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      let method = req.body._method;
      delete req.body._method;
      return method;
    } 
}));

app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use('/', libros);

// Puesta en marcha del servidor
app.listen(8080);