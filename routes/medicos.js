/*
Ruta: '/api/medicos' 
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const {
    getMedicos,
    crearMedicos,
    actualizarMedicos,
    borrarMedicos
} = require('../controllers/medicos');


const router = Router();

router.get('/', getMedicos);

router.post('/', [
        validarJWT,
        check('nombre', 'El nombre del medico es necesario').not().isEmpty(),
        check('hospital', 'El hospital id debe de ser valido').isMongoId(),
        validarCampos
    ], crearMedicos

);
// actualizar el nombre del medico y el hospital y el usuario que se extrae del token
router.put('/:id', [
        validarJWT,
        check('nombre', 'El nombre del medico es necesario').not().isEmpty(),
        check('hospital', 'El hospital id debe de ser valido').isMongoId(),
        validarCampos

    ], actualizarMedicos

);

router.delete('/:id', validarJWT, borrarMedicos);

module.exports = router;