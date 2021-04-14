const mongoose = require('mongoose');
let Schema = mongoose.Schema;
let registroautoSchema = new Schema({
    // idDriver: {
    //     type: mongoose.Types.ObjectId,
    //     ref: 'usuario'
    // },
    propietario: {
        type: String,
    },
    placas: {
        type: String,
    },
    modelo: {
        type: String,
    },
    anio: {
        type: Number,
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

module.exports = mongoose.model('registro-auto', registroautoSchema);