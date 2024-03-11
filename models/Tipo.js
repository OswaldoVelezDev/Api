const { Schema, model } = require('mongoose');

const TipoSchema = Schema({
    nombres: { type: String, required: true },
    FechaCreacion: { type: Date, required: true },
    FechaActualización: { type: Date, required: true },
    Descripción: { type: String, required: true }

});

module.exports = model('Tipo', TipoSchema);