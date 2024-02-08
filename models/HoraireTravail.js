const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    idEmploye: { type: mongoose.Schema.Types.ObjectId, ref: 'utilisateur', required: true },
    heureDebut: { type: String, required: true },
    heureFin: { type: String, required: true },
    pauseDebut: { type: String, required: true },
    pauseFin: { type: String, required: true },
});

module.exports = mongoose.model('horarireTravail', schema);