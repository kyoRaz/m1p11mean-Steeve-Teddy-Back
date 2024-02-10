const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const serviceSchema = new Schema({
    nom: { type: String, required: true },
    delai: { type: String, required: true },
    prix: { type: Number, required: true },
    commission: { type: Number, required: true },
    estActif: { type: Boolean, default: true },
});

module.exports = mongoose.model('service', serviceSchema);