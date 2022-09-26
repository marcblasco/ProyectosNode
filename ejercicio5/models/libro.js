const mongoose = require('mongoose');


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
    precio: {
        type: Number,
        required: true,
        min: 1,
        max: 90
    }
   });
   


  
   
let Libro = mongoose.model('libros', contactoSchema);
module.exports = Libro;