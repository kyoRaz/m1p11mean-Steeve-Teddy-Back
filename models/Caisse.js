const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    date: {
        type: Date,
        default: Date.now
    },
    description: {
        type: String,
        required: false
    },
    idType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'typeTransaction',
        required: true
    },
    idrdvdetail: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'rdvDetail',
        required: false
    },
    entree: {
        type: Number,
        default: 0
    },
    sortie: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('caisse', schema);

