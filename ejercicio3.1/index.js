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
   
   // mostrar libros con precio superior a 10€
conexion.query("SELECT * FROM libros where precio > ?",[10], (error, resultado, campos) => {
    if (error)
        console.log("Error al procesar la consulta");
    else{
        resultado.forEach((libro) => {
        console.log(libro.id, ":",libro.titulo, ":",  libro.autor , ":",  libro.precio);
    });
    }
});
//insertar libros
/*
conexion.query("INSERT INTO libros SET ?",
 {titulo: 'narnia', autor: 'alba', precio: 11},
 (error, resultado, campos) => {
    if (error)
    console.log("Error al procesar la inserción");
    else
    console.log("Nuevo id = ", resultado.insertId);
});*/

//borrar libro nº3

conexion.query("DELETE FROM libros WHERE id = ?",[3],
 (error, resultado, campos) => {
 if (error)
 console.log("Error al realizar el borrado");
 else
 console.log(resultado.affectedRows,"filas afectadas");
});

       
//update
conexion.query("update libros SET precio = '"+30+"' where id = '"+1+"'",
 (error, resultado, campos) => {
    if (error)
    console.log("Error al procesar la inserción");
    else
    console.log("Nuevo id = ", resultado.insertId);
});