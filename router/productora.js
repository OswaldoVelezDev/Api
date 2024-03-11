const { Router } = require('express');
const Productora = require('../models/Productora');
const { validationResult, check } = require('express-validator');

const router = Router();

// crear productora
router.post('/', [
    check('nombre', 'invalid.nombre').not().isEmpty(),
    check('estado', 'invalid.estado').isIn(['Activo', 'Inactivo']),
    check('slogan', 'invalid.slogan').not().isEmpty(),
    check('descripcion', 'invalid.descripcion').not().isEmpty(),
], async (req, res) => {

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array() });
        }

        const productoraExistente = await Productora.findOne({ nombre: req.body.nombre })
        if (productoraExistente) {
            return res.status(409).json({ mensaje: ["la productora ya existe"] })
        }


        let productora = new Productora();
        productora.nombre = req.body.nombre;
        productora.estado = req.body.estado;
        productora.descripcion = req.body.descripcion;
        productora.slogan = req.body.slogan;
        productora.fechaCreacion = new Date();
        productora.fechaActualizacion = new Date();


        productora = await productora.save();

        res.send(productora);


    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: "Error en el servidor al crear productora" });
    }
});

// listar usuarios
router.get('/', async function (req, res) {

    try {

    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: "Error en el servidor" })
    }

    const productora = req.query.productora;
    const productoras = await Productora.find();
    res.send(productoras);
});

// actualizar usuario
router.put('/:productoraId', [
    check('nombre', 'invalid.nombre').not().isEmpty(),
    check('estado', 'invalid.estado').isIn(['Activo', 'Inactivo']),
    check('slogan', 'invalid.slogan').not().isEmpty(),
    check('descripcion', 'invalid.descripcion').not().isEmpty(),
], async (req, res) => {

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array() });
        }

        let productora = await Productora.findById(req.params.productoraId);
        if (!productora) {
            return res.status(404).json("la productora no existe.");
        }
        const productoraExistente = await Productora.findOne({ nombre: req.body.nombre, _Id: { $ne: productora._id } });
        if (productoraExistente) {
            return res.status(409).json({ mensaje: ["la productora ya existe"] })
        }


        productora.nombre = req.body.nombre;
        productora.estado = req.body.estado;
        productora.slogan = req.body.slogan;
        productora.descripcion = req.body.descripcion;
        productora.fechaActualizacion = new Date();


        productora = await productora.save();

        res.send(productora);


    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: "Error en el servidor al actualizar la productora" });
    }
});

module.exports = router;
