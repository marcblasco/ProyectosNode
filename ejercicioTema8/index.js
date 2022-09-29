// Carga de librerías
const express = require('express');
const mongoose = require('mongoose');
const nunjucks = require('nunjucks');
const session = require('express-session');
const methodOverride = require('method-override');

// Enrutadores
const libros = require(__dirname + '/routes/libros');

const usuarios = [
    { usuario: 'nacho', password: '12345' },
    { usuario: 'pepe', password: 'pepe111' }
   ];
   
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

// Middleware
app.use(express.json());
app.use(express.urlencoded());
// Middleware para procesar otras peticiones que no sean GET o POST
app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      let method = req.body._method;
      delete req.body._method;
      return method;
    } 
}));

app.use(session({
    secret: '1234',
    resave: true,
    saveUninitialized: false
}));
   
app.use((req, res, next) => {
    res.locals.session = req.session;
    next();
});   

app.use('/public', express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use('/libros', libros);

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', (req, res) => {
    let login = req.body.login;
    let password = req.body.password;       
    let existeUsuario = usuarios.filter(usuario =>
    usuario.usuario == login && usuario.password == password);
    if (existeUsuario.length > 0)
    {
        req.session.usuario = existeUsuario[0].usuario;
        req.session.rol = existeUsuario[0].rol;
        res.redirect('/libros');
    } else {
        res.render('login',  {error: "Usuario o contraseña incorrectos"});
    }
});

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/libros');
});
// Puesta en marcha del servidor
app.listen(8080);