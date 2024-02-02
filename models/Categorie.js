const mongoose = require('mongoose');

const categorieSchema = new mongoose.Schema({
  libelle: {
    type: String,
    required: true
  },
  icone: {
    type: String,
    required: true
  }
},{collection: 'categorie'});

const Categorie = mongoose.model('categorie', categorieSchema);
module.exports = Categorie;