const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

// Enrutadores
const libros = require(__dirname + '/routers/libros');


// Conectar con BD en Mongo 
mongoose.connect('mongodb://localhost:27017/libros', 
    {useNewUrlParser: true, useUnifiedTopology: true});


// Palabra secreta para cifrar los tokens
const secreto = "secretoNode";

// Base de datos simulada de usuarios registrados
const usuarios = [
    { usuario: 'nacho', password: '12345', rol: 'admin' },
    { usuario: 'pepe', password: 'pepe111', rol: 'normal' }
];

// Método para generar el token cuando el usuario se valide correctamente
let generarToken = (login, rol) => {
    return jwt.sign({login: login}, secreto, {expiresIn: "2 hours"});
};



let app = express();

app.use(express.json());


app.use(express.json());
app.use('/libros', libros);

// Ruta para hacer el login y recibir el token de acceso
app.post('/login', (req, res) => {
    let usuario = req.body.usuario;
    let password = req.body.password;

    let existeUsuario = usuarios.filter(u => 
        u.usuario == usuario && u.password == password);

    if (existeUsuario.length == 1)
        res.send({ok: true, token: generarToken(existeUsuario[0].usuario, existeUsuario[0].rol)});
    else
        res.send({ok: false});
});
// Puesta en marcha del servidor
app.listen(8080);