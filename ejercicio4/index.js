const mongoose = require('mongoose');
const Libro = require(__dirname + "/models/libro");


mongoose.connect('mongodb://localhost:27017/libros',
 { useNewUrlParser: true, useUnifiedTopology: true });

 let libro1= new Libro({
    titulo: 'saw',
    autor: 'patricio '
 


 })
libro1.save().then(result =>{
    console.log('libro añadido'+ result);
}).catch(err =>{
    console.log('error al añadir'+ err)
})
   // busqueda de libros de 10 a 20 €
Libro.find({ precio: {$gte: 10, $lte: 20}})
.then(resultado => {
 console.log('Resultado de la búsqueda:', resultado);
})
.catch(error => {
 console.log('ERROR:', error);
});
// busqueda por id
Libro.findById('632d6e2fd07c35f92e063fc1')
.then(resultado => {
 console.log('Resultado de la búsqueda por ID:', resultado);
})
.catch(error => {
 console.log('ERROR:', error);
});


//borrar libro por id
Libro.findByIdAndRemove('632d6e0d819bb26f43212c80')
.then(resultado => {
 console.log("Contacto eliminado:", resultado);
}).catch (error => {
 console.log("ERROR:", error);
});


// update Libro

Libro.findByIdAndUpdate('632d70987857fb5059a981ae',
 {$set: {titulo:'juego de ender',autor:'sponge', precio: 20}}, {new:true})
.then(resultado => {
 console.log("Modificado libro:", resultado);
}).catch (error => {
 console.log("ERROR:", error);
});
