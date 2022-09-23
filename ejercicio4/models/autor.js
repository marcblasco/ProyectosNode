const mongoose = require('mongoose');

let AutorSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        minlength: 3,
        trim: true
    },
    anyoNac: {
        type: Number,
        required: false,
        min: 1,
        max: 2000,
        trim: true
    }
   });
   

let Autor = mongoose.model('autores', AutorSchema);
module.exports = Autor;