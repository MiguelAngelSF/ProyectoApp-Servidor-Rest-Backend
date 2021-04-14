const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let calSchema = new Schema({

    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    calificacion: {
        type: String,
        required: [true, 'La calificacion es necesario']
    },
    estado: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },

});

module.exports = mongoose.model('Calificacion', calSchema);