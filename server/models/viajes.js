const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let viajeSchema = new Schema({
    destino: {
        type: String,

    },
    actual: {
        type: String,
    },
    email: {
        type: String,
    },

    pago: {
        type: String,
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

module.exports = mongoose.model('Viaje', viajeSchema);