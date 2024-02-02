const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const avisSchema = new Schema({
  note: { type: Number, required: true, min: 1, max: 5 },
  commentaire: { type: String, required: true },
  dateAvis: { type: Date, required: true, default: Date.now },
  utilisateur: { type: Schema.Types.ObjectId, ref: 'utilisateur', required: true },
  images: [{ type: String }],
},
  { collection: 'avis' }
);

module.exports = mongoose.model('avis', avisSchema);