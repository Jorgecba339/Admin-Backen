const { response } = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');

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

const googleSignIn = async(req, res = response) => {

    const googleToken = req.body.token;

    try {

        const { name, email, picture } = await googleVerify(googleToken);

        // Verificar email en DB
        const usuarioDB = await Usuario.findOne({ email });
        let usuario;
        // Si el usuario no existe
        if (!usuarioDB) {
            usuario = new Usuario({
                nombre: name,
                email,
                password: '@@@',
                img: picture,
                google: true
            });

        } else {
            // Si existe el usuario
            usuario = usuarioDB;
            usuario.google = true;
        }
        // grabar en DB
        await usuario.save();
        // Generar TOKEN
        const token = await generarJWT(usuarioDB.id);

        res.status(200).json({
            ok: true,
            token
        });

    } catch (error) {
        res.status(401).json({
            ok: false,
            msg: 'Token no es correcto',

        });
    }

};
const renewToken = async(req, res = response) => {

    const uid = req.uid;
    // Generar TOKEN
    const token = await generarJWT(uid);

    res.json({
        ok: true,
        token
    });

};

module.exports = { login, googleSignIn, renewToken };