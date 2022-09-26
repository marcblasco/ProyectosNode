const express = require('express');
const os= require('os');
let app = express();
app.listen(8080);



app.get('/', (req, res) => {
    res.send('Hola, bienvenido/a');
   });

app.get('/fecha', (req, res) => {
let now= new Date();
res.send(now);
});   

app.get('/usuario', (req, res) => {
    res.send(os.userInfo().username);
    });   
   