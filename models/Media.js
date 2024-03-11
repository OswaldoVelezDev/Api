const {Schema, model} = require('moongose');

const MediaSchema = Schema({

    Serial : {
        type: String,
        required: true,
        unique:true
    },
     Titulo : {
        type : String,
        required : true,
        
    },
    Sipnosis : {
        type : String,
        required : true
    },
    URL : {
        type: String,
        required: true,
        unique: true
    },
    Foto :{
        type : String,
        required : true
    },
    FechaCreacion: { 
        type: Date, 
        required:true 
    },
    FechaActualización: { 
        type: Date, 
        required: true 
    },
    AñoEstreno : {
        type : Date,
        required : true
    },
    Genero: {
        type: Schema.types.objectid,
        ref: 'Genero', 
        required : true
    },
    Director: {
        type: Schema.types.objectid,
        ref: 'Director', 
        required : true
    },
    Productora: {
        type: Schema.types.objectid,
        ref: 'Productora', 
        required : true
    },
    Tipo: {
        type: Schema.types.objectid,
        ref: 'Tipo', 
        required : true
    }



});

 module.exports = model('Media', MediaSchema);