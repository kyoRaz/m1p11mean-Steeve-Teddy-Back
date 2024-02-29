const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    montant: {
        type: Number,
        default: 0
    },
    idUser: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'utilisateur', required: true 
    },
});

module.exports = mongoose.model('solde', schema);

