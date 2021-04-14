const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let driverSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    email: {
        type: String,
        required: [true, 'El correo es necesario'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es necesaria']
    },
    edad: {
        type: Number,
        required: [true, 'La edad es necesaria']
    },
    genero: {
        type: String
    },
    tipoUsuario: {
        type: String,
        required: [true, 'El tipo de Usuario es necesario']
    },
    estado: {
        type: Boolean,
        default: true
    },

    //collection: "usuario"
});

module.exports = mongoose.model('Driver', driverSchema);