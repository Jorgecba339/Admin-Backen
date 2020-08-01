require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConection } = require('./database/config');

// Crea el server express
const app = express();

// CORS
app.use(cors());

// Lectura y parseo del body
app.use(express.json());

// Base de datos
dbConection();

// Contenido publico
app.use(express.static('public'));


// Rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/hospitales', require('./routes/hospitales'));
app.use('/api/medicos', require('./routes/medicos'));
app.use('/api/todo', require('./routes/busquedas'));
app.use('/api/upload', require('./routes/uploads'));
app.use('/api/login', require('./routes/auth'));


app.listen(process.env.PORT, () => {
    console.log('servidor corriendo en puerto: ' + process.env.PORT);
});