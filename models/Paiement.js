const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    date: {
        type: Date,
        default: Date.now
    },
    description: {
        type: String,
        required: false
    },
    idrdv: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'rdv',
        required: false
    },
    idModePaiement: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'modePaiement',
        required: false
    },
    montant: { type: Number, required: true },
});

module.exports = mongoose.model('paiement', schema);
