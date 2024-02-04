const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roleSchema = new Schema({
    libelle: { type: String, required: true },
});

module.exports = mongoose.model('role', roleSchema);