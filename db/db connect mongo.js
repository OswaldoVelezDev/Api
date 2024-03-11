const mongoose = require('mongoose');

const getConnection = async () => {

    try {
        
        const url = 'mongodb+srv://velezHero:Coronel00@cluster0.jb81bum.mongodb.net/peliculas?retryWrites=true&w=majority&appName=Cluster0 '


        await mongoose.connect(url);

        console.log('conexion exitosa');

    } catch (error) {
        console.log(error);
    }



}

module.exports = {
    getConnection,
}