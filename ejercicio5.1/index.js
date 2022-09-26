let personas = [
    { nombre: "Nacho", edad: 39},
    { nombre: "Mario", edad: 4},
    { nombre: "Laura", edad: 2},
    { nombre: "Nora", edad: 10}
   ];
   // Convertir array a JSON
   let personasJSON = JSON.stringify(personas);
   console.log(personasJSON);
   
   let personas2 = JSON.parse(personasJSON);
console.log(personas2);