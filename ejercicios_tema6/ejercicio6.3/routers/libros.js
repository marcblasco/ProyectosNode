const express = require('express');
let Libro = require(__dirname + "/../models/libro.js");

let router = express.Router();
   
router.get('/', (req, res) => {
    Libro.find().then(resultado => {
    res.render('index', {libros: resultado});
    }).catch(error => {
        res.status(500)
        .send( {ok: false, error: "Error obteniendo contactos"})
    });
});
// Formulario de alta de contacto
router.get('/nuevo', (req, res) => {
    res.render('libros_nuevo');
});

router.get('/libros/:id', (req, res) => {
    Libro.findById(req.params.id).then(resultado => {
        if(resultado){
            res.render('libros_ficha', { libro: resultado});
        }
        else  res.render('error', { error: 'libro no encontrado'});
    }).catch(error => {
    // Aquí podríamos renderizar una página de error
    });
});


router.post('/libros', (req, res) => {
    console.log(req.body)
    let nuevoLibro = new Libro({
        titulo : req.body.titulo,
        editorial : req.body.editorial,
        precio : req.body.precio
    });
    nuevoLibro.save().then(resultado => {
        res.redirect('/');
    }).catch(error => {
        res.status(400).send({ok: false,error: "Error añadiendo libro"});
    })
});

/*router.put('/:id', (req, res) => {

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
   */
router.delete('/libros/:id', (req, res) => {
    Libro.findByIdAndRemove(req.params.id).then(resultado => {
        res.redirect('/');
    }).catch(error => {
        res.status(400).send({ok: false, error:"Error eliminando libro"});
    });
   });

module.exports = router



