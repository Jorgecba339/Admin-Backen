const { response } = require('express');
const Hospital = require('../models/hospital');

const getHospitales = async(req, res = response) => {

    const hospitales = await Hospital.find()
        .populate('usuario', 'nombre img');

    res.json({
        ok: true,
        hospitales
    });
};
const crearHospital = async(req, res = response) => {

    const uid = req.uid;
    const hospital = new Hospital({ usuario: uid, ...req.body });

    try {

        const hospitalDB = await hospital.save();

        res.json({
            ok: true,
            hospital: hospitalDB
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }

};
const actualizarHospital = async(req, res = response) => {

    const hid = req.params.id;
    const uid = req.uid;

    try {

        const hospitalDB = await Hospital.findById(hid);
        if (!hospitalDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe hospital con ese id'
            });
        }
        const cambioHospital = {
            ...req.body,
            usuario: uid,
        };
        const hospitalActualizado = await Hospital.findByIdAndUpdate(hid, cambioHospital, { new: true });

        res.status(200).json({
            ok: true,
            hospitalActualizado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }

};
const borrarHospital = async(req, res = response) => {

    const hid = req.params.id;

    try {
        const hospitalDB = await Hospital.findById(hid);
        if (!hospitalDB) {
            res.status(404).json({
                ok: false,
                msg: 'No existe hospital con ese id'
            });
        }
        await Hospital.findByIdAndDelete(hid);

        res.json({
            ok: true,
            msg: 'Hospital eliminado'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al borrar Hospital'
        });

    }
};

module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
};