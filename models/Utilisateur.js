const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const utilisateurSchema = new Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  roleId: { type: mongoose.Schema.Types.ObjectId, ref: 'role', required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model('utilisateur', utilisateurSchema);