const { Router } = require('express');
const Media = require('../models/Media');
const { validationResult, check } = require('express-validator');


const router = Router();

router.post('/', [
    check('serial', 'invalid.serial').not().isEmpty(),
    check('titulo', 'invalid.titulo').not().isEmpty(),
    check('sinopsis', 'invalid.sinopsis').not().isEmpty(),
    check('URL', 'invalid.URL').not().isEmpty(),
    check('foto', 'invalid.descripcion').not().isEmpty(),
    check('anoEstreno', 'invalid.anoEstreno').not().isEmpty(),
    check('genero', 'invalid.genero').not().isEmpty(),
    check('director', 'invalid.director').not().isEmpty(),
    check('productora', 'invalid.productora').not().isEmpty(),
    check('tipo', 'invalid.tipo').not().isEmpty()


], async function (req, res) {
    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array() });
        }

        const existeMediaPorserial = await Media.findOne({ serial: req.body.serial });
        if (existeMediaPorserial) {
            return res.status(500).send("Ya hay un registro con este Serial");
        }

        let media = new Media(req.body);
        media.serial = req.body.serial;
        media.titulo = req.body.titulo;
        media.sinopsis = req.body.sinopsis;
        media.URL = req.body.URL;
        media.foto = req.body.foto;
        media.anoEstreno = req.body.anoEstreno;
        media.genero = req.body.genero._Id;
        media.director = req.body.director._Id;
        media.productora = req.body.productora._Id;
        media.tipo = req.body.tipo._Id;
        media.fechaCreacion = new Date();
        media.fechaActualizacion = new Date();

        media = await media.save();
        res.send(media);

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
});

//listar media
router.get('/', async function (req, res) {

    try {

    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: "Error en el servidor" })
    }

    const media = req.query.media;
    const multimedia = await Media.find().populate([
        {
            path:  'genero', select: 'nombre estado descripcion'
        },
        {
           path: 'director', select: 'nombre estado'
        },
        {
            path : 'productora', select:'nombre estado descripcion slogan'
        },
        {
            path :  'tipo' ,select: ' nombre descripcion '
        }
    ]);
    
    res.send(multimedia);
});

//actualizar media
router.put('/:mediaId', [
    check('serial', 'invalid.serial').not().isEmpty(),
    check('titulo', 'invalid.titulo').not().isEmpty(),
    check('sinopsis', 'invalid.sinopsis').not().isEmpty(),
    check('URL', 'invalid.URL').not().isEmpty(),
    check('foto', 'invalid.descripcion').not().isEmpty(),
    check('anoEstreno', 'invalid.anoEstreno').not().isEmpty(),
    check('genero', 'invalid.genero').not().isEmpty(),
    check('director', 'invalid.director').not().isEmpty(),
    check('productora', 'invalid.productora').not().isEmpty(),
    check('tipo', 'invalid.tipo').not().isEmpty()
], async (req, res) => {

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array() });
        }

        let media = await Media.findById(req.params.mediaId);
        if (!media) {
            return res.status(404).json("la media no existe.");
        }
        const mediaExistente = await Media.findOne({ nombre: req.body.nombre, _Id: { $ne: media._id } });
        if (mediaExistente) {
            return res.status(409).json({ mensaje: ["la media ya existe"] })
        }


        media.serial = req.body.serial;
        media.titulo = req.body.titulo;
        media.sinopsis = req.body.sinopsis;
        media.URL = req.body.URL;
        media.foto = req.body.foto;
        media.anoEstreno = req.body.anoEstreno;
        media.genero = req.body.genero._Id;
        media.director = req.body.director._Id;
        media.productora = req.body.productora._Id;
        media.tipo = req.body.tipo._Id;
        media.fechaCreacion = new Date();
        media.fechaActualizacion = new Date();


        media = await media.save();

        res.send(media);


    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: "Error en el servidor al actualizar la media" });
    }
});


module.exports = router;
