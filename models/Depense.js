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
    idTypeDepense: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'typeDepense',
        required: false
    },
    montant: { type: Number, required: true },
});

module.exports = mongoose.model('depense', schema);
