require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConection } = require('./database/config');

// Crea el server express
const app = express();

// CORS
app.use(cors());

// Base de datos
dbConection();


// Rutas
app.get('/', (req, res) => {

    res.json({
        ok: true,
        message: 'Hola Mundo'
    });
});





app.listen(process.env.PORT, () => {
    console.log('servidor corriendo en puerto: ' + process.env.PORT);
});