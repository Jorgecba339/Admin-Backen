const { response } = require('express');
const Medico = require('../models/medicos');

const getMedicos = async(req, res = response) => {

    const medicos = await Medico.find()
        .populate('usuario', 'nombre img')
        .populate('hospital', 'nombre img');

    res.json({
        ok: true,
        medicos
    });
};
const crearMedicos = async(req, res = response) => {

    const uid = req.uid;
    const medico = new Medico({ usuario: uid, ...req.body });


    try {

        const medicoDB = await medico.save();

        res.json({
            ok: true,
            medico: medicoDB
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
};
const actualizarMedicos = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const medicoDB = await Medico.findById(id);
        if (!medicoDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe medico con ese id'
            });
        }
        const cambioMedico = {
            ...req.body,
            usuario: uid,
        };
        const medicoActualizado = await Medico.findByIdAndUpdate(id, cambioMedico, { new: true });

        res.status(200).json({
            ok: true,
            medicoActualizado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }


};
const borrarMedicos = async(req, res = response) => {

    const id = req.params.id;

    try {
        const medicoDB = await Medico.findById(id);
        if (!medicoDB) {
            res.status(404).json({
                ok: false,
                msg: 'No existe medico con ese id'
            });
        }
        await Medico.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Medico eliminado'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al borrar medico'
        });

    }
};

module.exports = {
    getMedicos,
    crearMedicos,
    actualizarMedicos,
    borrarMedicos
};