const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let alertaSchema = new Schema({
    descripcion: {
        type: String,
        required: [true, 'La descripcion es necesaria']
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

module.exports = mongoose.model('Alerta', alertaSchema);