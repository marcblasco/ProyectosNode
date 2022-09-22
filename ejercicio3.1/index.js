const mysql = require('mysql');
let conexion = mysql.createConnection({
 host: "localhost",
 user: "root",
 password: "",
 database: "libros"
});
conexion.connect((error) => {
    if (error)
    console.log("Error al conectar con la BD:", error);
    else
    console.log("Conexión satisfactoria");
   });
   
conexion.query("SELECT * FROM libros where precio > ?",[10], (error, resultado, campos) => {
    if (error)
        console.log("Error al procesar la consulta");
    else{
        resultado.forEach((libro) => {
        console.log(libro.id, ":",libro.titulo, ":",  libro.autor , ":",  libro.precio);
    });
    }
});