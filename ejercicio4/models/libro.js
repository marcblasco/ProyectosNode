const mongoose = require('mongoose');

let comentarioSchema = new mongoose.Schema({
    fecha: {
        type: Date,
        required: false,
        default: new Date()
    },
    nick: {
        type: String,
        required: true
    },
    texto: {
        type: String,
        required: true
    }
   });

let contactoSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true,
        minlength: 3,
        trim: true
    },
    editorial: {
        type: String,
        required: false,
        minlength: 0,
        trim: true
    },
    autor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'autores',
        required: false,
        minlength: 0,
        trim: true
    },
    precio: {
        type: Number,
        required: true,
        min: 1,
        max: 90
    },
    comentario:[comentarioSchema]
   });
   


  
   
let Libro = mongoose.model('libros', contactoSchema);
module.exports = Libro;