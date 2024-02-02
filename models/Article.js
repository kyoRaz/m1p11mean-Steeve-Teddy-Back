const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Avis = require('./Avis');


const articleSchema = new Schema({
    titre: { type: String, required: true },
    description: { type: String, required: true },
    images: [{ type: String }],
    videos: [{ type: String }],
    datecreation: { type: Date, required: true, default: Date.now },
    avis: [{ type: Schema.Types.ObjectId, ref: 'avis' }],
    categorieId: { type: Schema.Types.ObjectId, ref: 'categorie' }
}, { collection: 'article' });

module.exports = mongoose.model('article', articleSchema);