const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rdvDetailSchema = new Schema({
    idUser: { type: mongoose.Schema.Types.ObjectId, ref: 'utilisateur', required: true },
    idEmploye: { type: mongoose.Schema.Types.ObjectId, ref: 'utilisateur', required: true },
    idService: { type: mongoose.Schema.Types.ObjectId, ref: 'service', required: true },
    horaireService: { type: Date,  required: true },
    daterdv: { type: Date, required: true },
    statusService : { type: String, required: true }
});

module.exports = mongoose.model('rdvdetail', rdvDetailSchema);