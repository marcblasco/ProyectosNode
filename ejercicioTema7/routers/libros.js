const express = require('express');
let Libro = require(__dirname + "/../models/libro.js");
const jwt = require('jsonwebtoken');
let router = express.Router();
const secreto="secretoNode"
// Método para validar un token que llega de un usuario presuntamente validado
let validarToken = (token) => {
    try {
        let resultado = jwt.verify(token, secreto);
        return resultado;
    } catch (e) {}
};

// Middleware a aplicar a cada recurso protegido, para dejar pasar sólo a los usuarios
// validados que tengan el rol indicado (cadena vacía para no necesitar ningún rol)
let protegerRuta = (req, res, next) => {
    let token = req.headers['authorization'];
    if (token) {
        token = token.substring(7);
        let resultado = validarToken(token);
        if (resultado)
            next();
        else
            res.send({ok: false, error: "Usuario no autorizadoo"});        
    } else 
        res.send({ok: false, error: "Usuario no autorizadooo"});        
};

router.get('/', (req, res) => {
    Libro.find().then(resultado => {
    res.status(200)
    .send( {ok: true, resultado: resultado});
    }).catch (error => {
    res.status(500)
    .send( {ok: false, error: "Error obteniendo contactos"})
 });
});

router.get('/:id', (req, res) => {
    Libro.findById(req.params.id).then(resultado => {
    if(resultado)
        res.status(200).send({ok: true, resultado: resultado});
    else
        res.status(400).send({ok: false,error: "No se han encontrado contactos"});
    }).catch (error => {
    res.status(400).send({ok: false,error: "Error buscando el contacto indicado"});
    });
   });

router.post('/',protegerRuta, (req, res) => {
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

router.put('/:id',protegerRuta, (req, res) => {

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
   
router.delete('/:id', protegerRuta, (req, res) => {

    Libro.findByIdAndRemove(req.params.id).then(resultado => {
        if (resultado)
            res.status(200)
               .send({ok: true, resultado: resultado});
        else
            res.status(400)
               .send({ok: false, 
                      error: "No se ha encontrado el libro para eliminar"});
    }).catch(error => {
        res.status(400)
           .send({ok: true, 
                  error:"Error eliminando libro"});
    });
});

module.exports = router



