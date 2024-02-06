const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rdvSchema = new Schema({
    idUser: { type: mongoose.Schema.Types.ObjectId, ref: 'utilisateur', required: true },
    dateCreation: { type: Date,  required: true },
    daterdv: { type: Date, required: true },
});

module.exports = mongoose.model('rdv', rdvSchema);