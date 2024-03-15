const { Router } = require('express');
const Tipo = require('../models/Tipo');
const { validationResult, check } = require('express-validator');

const router = Router();

// crear Tipo
router.post('/', [
    check('nombre', 'invalid.nombre').not().isEmpty(),
    check('descripcion', 'invalid.descripcion').not().isEmpty(),
], async (req, res) => {

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array() });
        }

        const tipoExistente = await Tipo.findOne({ nombre: req.body.nombre })
        if (tipoExistente) {
            return res.status(409).json({ mensaje: ["el tipo ya existe"] })
        }


        let tipo = new Tipo();
        tipo.nombre = req.body.nombre;
        tipo.descripcion = req.body.descripcion;
        tipo.fechaCreacion = new Date();
        tipo.fechaActualizacion = new Date();


        tipo = await tipo.save();

        res.send(tipo);


    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: "Error en el servidor al crear tipo" });
    }
});

// listar tipos
router.get('/', async function (req, res) {

    try {

    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: "Error en el servidor" })
    }

    const tipo = req.query.tipo;
    const tipos = await Tipo.find();
    res.send(tipos);
});

// actualizar tipos
router.put('/:tipoId', [
    check('nombre', 'invalid.nombre').not().isEmpty(),
    check('descripcion', 'invalid.descripcion').not().isEmpty(),
], async (req, res) => {

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array() });
        }

        let tipo = await Tipo.findById(req.params.tipoId);
        if (!tipo) {
            return res.status(404).json("el tipo no existe.");
        }
        const tipoExistente = await Tipo.findOne({ nombre: req.body.nombre, _Id: { $ne: tipo._id } });
        if (tipoExistente) {
            return res.status(409).json({ mensaje: ["el tipo ya existe"] })
        }


        tipo.nombre = req.body.nombre;
        tipo.descripcion = req.body.descripcion;
        tipo.fechaActualizacion = new Date();


        tipo = await tipo.save();

        res.send(tipo);


    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: "Error en el servidor al actualizar el tipo" });
    }
});

module.exports = router;
