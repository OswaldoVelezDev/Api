const { Router } = require('express');
const Genero = require('../models/Genero');
const { validationResult, check } = require('express-validator');

const router = Router();

// crear genero
router.post('/', [
    check('nombre', 'invalid.nombre').not().isEmpty(),
    check('estado', 'invalid.estado').isIn(['Activo', 'Inactivo']),
    check('descripcion', 'invalid.descripcion').not().isEmpty(),
], async (req, res) => {

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array() });
        }

        const generoExistente = await Genero.findOne({ nombre: req.body.nombre })
        if (generoExistente) {
            return res.status(409).json({ mensaje: ["El género ya existe"] })
        }


        let genero = new Genero();
        genero.nombre = req.body.nombre;
        genero.estado = req.body.estado;
        genero.descripcion = req.body.descripcion;
        genero.fechaCreacion = new Date();
        genero.fechaActualizacion = new Date();


        genero = await genero.save();

        res.send(genero);


    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: "Error en el servidor al crear el genero" });
    }
});

// listar usuarios
router.get('/', async function (req, res) {

    try {

    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: "Error en el servidor" })
    }

    const genero = req.query.genero;
    const generos = await Genero.find();
    res.send(generos);
});

// actualizar usuario
router.put('/:generoId', [
    check('nombre', 'invalid.nombre').not().isEmpty(),
    check('estado', 'invalid.estado').isIn(['Activo', 'Inactivo']),
    check('descripcion', 'invalid.descripcion').not().isEmpty(),
], async (req, res) => {

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array() });
        }

        let genero = await Genero.findById(req.params.generoId);
        if (!genero) {
            return res.status(404).json("El género no existe.");
        }
        const generoExistente = await Genero.findOne({ nombre: req.body.nombre, _Id: { $ne: genero._id } });
        if (generoExistente) {
            return res.status(409).json({ mensaje: ["El género ya existe"] })
        }


        genero.nombre = req.body.nombre;
        genero.estado = req.body.estado;
        genero.descripcion = req.body.descripcion;
        genero.fechaActualizacion = new Date();


        genero = await genero.save();

        res.send(genero);


    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: "Error en el servidor al actualizar el genero" });
    }
});

module.exports = router;
