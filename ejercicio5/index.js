const express = require('express');
const mongoose = require('mongoose');

const os= require('os');
let app = express();
//midleware
app.use(express.json());

const Libro = require(__dirname + "/models/libro");

mongoose.connect('mongodb://localhost:27017/libros',
 {useNewUrlParser: true, useUnifiedTopology: true});


/*
//-----------ejercicio 5.1---------------------
app.get('/', (req, res) => {
    res.send('Hola, bienvenido/a');
   });

app.get('/fecha', (req, res) => {
let now= new Date();
res.send(now);
});   

app.get('/usuario', (req, res) => {
    res.send(os.userInfo().username);
    });   
    */
//---------------final ejercicio 5.1  -----------

//-----------ejercicio 5.2---------------------
app.get('/libros', (req, res) => {
    Libro.find().then(resultado => {
    res.status(200)
    .send( {ok: true, resultado: resultado});
    }).catch (error => {
    res.status(500)
    .send( {ok: false, error: "Error obteniendo contactos"})
 });
});

app.get('/libros/:id', (req, res) => {
    Libro.findById(req.params.id).then(resultado => {
    if(resultado)
        res.status(200).send({ok: true, resultado: resultado});
    else
        res.status(400).send({ok: false,error: "No se han encontrado contactos"});
    }).catch (error => {
    res.status(400).send({ok: false,error: "Error buscando el contacto indicado"});
    });
   });
   
   app.post('/libros', (req, res) => {

    console.log(req.body)
    let nuevoLibro = new Libro({
        titulo : req.body.titulo,
        editorial : req.body.editorial,
        precio : req.body.precio
    });
    nuevoLibro.save().then(resultado => {
        res.status(200).send({ok: true, resultado: resultado});
    }).catch(error => {
        res.status(400).send({ok: false,error: "Error añadiendo libro"});
    })
});

app.put('/libros/:id', (req, res) => {

    Libro.findByIdAndUpdate(req.params.id, {
        $set: {
            titulo: req.body.titulo,
            editorial: req.body.editorial,
            precio: req.body.precio
        }
    }, {new: true}).then(resultado => {
        if (resultado)
            res.status(200).send({ok: true, resultado: resultado});
        else
            res.status(400).send({ok: false, error: "No se ha encontrado el libro para actualizar"});
    }).catch(error => {
        res.status(400).send({ok: false, error:"Error actualizando libro"});
    });
});
   
app.delete('/libros/:id', (req, res) => {
    Libro.findByIdAndRemove(req.params.id).then(resultado => {
        res.status(200).send({ok: true, resultado: resultado});
    }).catch(error => {
        res.status(400).send({ok: false, error:"Error eliminando libro"});
    });
   });






app.listen(8080);
