const Utilisateur = require('../models/Utilisateur');
const bcrypt = require('bcrypt');


async function doInscription(nom, prenom, dateNaissance, adresse, login, motdepasse) {
  try {
    const utilisateurExistant = await Utilisateur.findOne({ login });
    if (utilisateurExistant) {
      throw new Error('Cet utilisateur existe déjà.');
    }

    const motdepasseHache = await bcrypt.hash(motdepasse, 10);

    const nouvelUtilisateur = new Utilisateur({
      nom,
      prenom,
      dateNaissance,
      adresse,
      login,
      motdepasse: motdepasseHache,
    });

    const utilisateurEnregistre = await nouvelUtilisateur.save();

    return utilisateurEnregistre;
  } catch (error) {
    throw error;
  }
}

const getAllUser = async () => {
  try {
    let list = await Utilisateur.find();
    return list;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  doInscription,
  getAllUser
};
