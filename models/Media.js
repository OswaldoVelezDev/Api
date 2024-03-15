const mongoose = require('mongoose'); 

const { Schema, model } = mongoose; 
const MediaSchema = new Schema({
  
    serial: {
    type: String,
    required: true,
    unique: true, 
  },
  titulo: {
    type: String,
    required: true,
  },
  sinopsis: {
    type: String,
    required: true,
  },
  URL: {
    type: String,
    required: true,
    unique: true, 
  },
  foto: {
    type: String,
    required: true,
  },
  fechaCreacion: {
    type: Date,
    required: true,
  },
  fechaActualizacion: {
    type: Date,
    required: true,
  },
  anoEstreno: {
    type: String,
    required: true,
  },
  genero: {
    type: Schema.Types.ObjectId,
    ref: 'Genero', 
    required: true,
  },
  director: {
    type: Schema.Types.ObjectId,
    ref: 'Director', 
    required: true,
  },
  productora: {
    type: Schema.Types.ObjectId,
    ref: 'Productora', 
  },
  tipo: {
    type: Schema.Types.ObjectId,
    ref: 'Tipo', 
    required: true,
  },
});


module.exports = model('Media', MediaSchema);
