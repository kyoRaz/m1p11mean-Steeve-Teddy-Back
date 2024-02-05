const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const preferenceSchema = new Schema({
    idUser: { type: mongoose.Schema.Types.ObjectId, ref: 'utilisateur', required: true },
    idService: { type: mongoose.Schema.Types.ObjectId, ref: 'service', required: true },
    idEmpFav: { type: mongoose.Schema.Types.ObjectId, ref: 'utilisateur', required: true },
});

module.exports = mongoose.model('preference', preferenceSchema);