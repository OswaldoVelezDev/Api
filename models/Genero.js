const {Schema, model} = require ('mongoose');

const GeneroSchema = Schema({
    nombre: { type: String, required: true },
    estado: { type: String, required: true, enum:['Activo', 'Inactivo'] },
    descripcion: {type: String, required:true},
    FechaActualización: { type: Date, default: Date.now },
    FechaCreacion: { type: Date, default: Date.now },
    
  });

  module.exports=model('Genero',GeneroSchema);