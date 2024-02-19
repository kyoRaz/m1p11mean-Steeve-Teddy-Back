const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rdvDetailSchema = new Schema({
    idRdv: { type: mongoose.Schema.Types.ObjectId, ref: 'rdv', required: true },
    idEmploye: { type: mongoose.Schema.Types.ObjectId, ref: 'utilisateur', required: true },
    idService: { type: mongoose.Schema.Types.ObjectId, ref: 'service', required: true },
    debutService: { type: String, required: true },
    finService: { type: String, required: true },
    statusService: { type: String, required: true }
});

module.exports = mongoose.model('rdvdetail', rdvDetailSchema);