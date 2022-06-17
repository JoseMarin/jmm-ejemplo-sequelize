const express = require('express');
const bodyParser = require('body-parser');
const colors = require('colors');
const morgan = require('morgan');

const app = express();
const PORT = 3000;

//Middleware
app.use(morgan('dev'));
app.use(express.json());

//Add datos de prueba
const movies = [
    {id:1, title: "Soy Leyenda"},
    {id:2, title: "El Risas"},
    {id:3, title: "Yo Robot"},
    {id:4, title: "El Hoyo"}
];

//Ruta Raiz
app.get('/', (req, res) => {
    let date = new Date();
    console.log(`home route works ------  ${date}`);
    res.send('Bienvenidos a Express');
});

//Ruta CRUD
//Metodo GET - READ ALL
app.get('/movies', (req, res) => {
    let date = new Date();
    res.json(movies);
});

//Metodo GET - READ por ID
app.get('/movies/:id', (req, res) => {
    //const id = rep.params.id;
    const {id} = req.params;
    let movie = movies.find(movie => movie.id == id);
    res.json(movie);
});

//Metodo POST - CREATE
app.post('/movies', (req, res) => {
    const {id, title} = req.body;
    const movie = {id, title};
    movies.push(movie);
    res.json(movie);
});

//Metodo PUT - UPDATE
app.put('/movies/:id', (req, res) => {
    const {id} = req.params;
    const {title} = req.body;
    let movieList = movies.filter(movie => movie.id != id);
    let movie = {id, title};
    movieList.push(movie);
    movies = movieList;
    res.json(movie);
});

//Metodo DELETE
app.put('/movies/:id', (req, res) => {
    const {id} = req.params;
    let movieList = movies.filter(movie => movie.id != id);
    movies = movieList;
    res.send(`Registro ${id} eliminado`);
});


// Iniciamos el server
app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`.bgGreen.black);
});