const { response } = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const login = async(req, res = response) => {

    const { email, password } = req.body;

    try {
        // Verifica email
        const usuarioDB = await Usuario.findOne({ email });
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Email no valido'
            });

        }
        // Verifica password
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Password no valido'
            });

        }
        // Generar TOKEN
        const token = await generarJWT(usuarioDB.id);

        res.status(200).json({
            ok: true,
            token
        });

    } catch (e) {
        console.log(e);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }
};

module.exports = { login };