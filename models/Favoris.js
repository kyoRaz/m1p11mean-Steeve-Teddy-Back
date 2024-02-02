const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Article = require('./Article');
const Utilisateur = require('./Utilisateur');

const favorisSchema = new Schema({
    articleId: { type: Schema.Types.ObjectId, ref: 'article' },
    userId: { type: Schema.Types.ObjectId, ref: 'utilisateur' }
}, { collection: 'favoris' });

module.exports = mongoose.model('favoris', favorisSchema);