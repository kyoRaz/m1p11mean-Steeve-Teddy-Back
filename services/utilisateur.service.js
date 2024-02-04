const Utilisateur = require('../models/Utilisateur');
const bcrypt = require('bcrypt');

const create = async (data, roleId) => {
  try {
    let { nom, prenom, email, password } = data;
    const utilisateurExistant = await Utilisateur.findOne({ email });
    if (utilisateurExistant) {
      throw new Error('Cet utilisateur existe déjà.');
    }

    const passwordHache = await bcrypt.hash(password, 10);

    const nouvelUtilisateur = new Utilisateur({
      nom,
      prenom,
      email,
      password: passwordHache,
      roleId
    });

    const newUser = await nouvelUtilisateur.save();
    return newUser;
  } catch (error) {
    throw error;
  }
}

async function createUser(data, roleId) {
  try {
    let { email, password } = data;
    const utilisateurExistant = await Utilisateur.findOne({ email });
    if (utilisateurExistant) {
      throw new Error('Cet utilisateur existe déjà.');
    }

    const passwordHache = await bcrypt.hash(password, 10);
    data.password = passwordHache;

    let newUser = await create(data, roleId);
    return newUser;
  } catch (error) {
    throw error;
  }
}
async function inscriptionClient(data) {
  try {
    let roleId = process.env.ROLE_CLIENT;
    let newUser = await createUser(data, roleId);
    return newUser;
  } catch (error) {
    throw error;
  }
}

const findAll = async () => {
  try {
    let list = await Utilisateur.find().populate('roleId')
      .then(commandes => {
        console.log(commandes);
      });
    return list;
  } catch (error) {
    throw error;
  }
}

const update = async (id, data) => {
  try {
    const update = {
      $set: data
    };
    const options = { new: true };

    let updatedObject = await Utilisateur.findByIdAndUpdate(id, update, options)
    return updatedObject;
  } catch (error) {
    throw error;
  }
}

const deleteById = async (id) => {
  try {
    await Utilisateur.findByIdAndRemove(id)
  } catch (error) {
    throw error;
  }
}

module.exports = {
  inscriptionClient,
  findAll,
  update,
  deleteById
};
