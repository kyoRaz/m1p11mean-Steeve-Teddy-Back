const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rdvSchema = new Schema({
    idUser: { type: mongoose.Schema.Types.ObjectId, ref: 'utilisateur', required: true },
    dateCreation: { type: Date, required: true },
    dateRdv: { type: Date, required: true },
    heureRdv: { type: String, required: true },
    estActif: { type: Boolean, default: true },
    isPaid: {type: Boolean,default: false}
});

module.exports = mongoose.model('rdv', rdvSchema);