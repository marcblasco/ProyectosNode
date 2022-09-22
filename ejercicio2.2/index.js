const personas = require(__dirname + '/personas');


personas.nuevaPersona({nombre: "Juan", telefono:"965661564", edad: 60}).then(resultado => {
    console.log("Añadida persona:", resultado);
}).catch(error => {
    console.log(error);
});

// Borrados
personas.borrarPersona("911223344").then(resultado => {
    console.log("Borrada persona:", resultado);
}).catch(error => {
    console.log(error);
});
