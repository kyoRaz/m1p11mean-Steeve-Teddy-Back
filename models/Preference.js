const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const preferenceSchema = new Schema({
    idService: { type: mongoose.Schema.Types.ObjectId, ref: 'service', required: true },
    idEmpFav: { type: mongoose.Schema.Types.ObjectId, ref: 'utilisateur', required: true },
});

module.exports = mongoose.model('preference', preferenceSchema);