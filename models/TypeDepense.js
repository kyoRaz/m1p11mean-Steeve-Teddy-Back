const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    libelle: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('typeDepense', schema);
