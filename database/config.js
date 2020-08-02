const mongoose = require('mongoose');
require('dotenv').config();

const dbConection = async() => {

    try {
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.log('DB online');

    } catch {
        console.log(error);
        throw new Error('Error al iniciar la DB ver logs');
    }


};

module.exports = {
    dbConection
};