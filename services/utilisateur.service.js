const Utilisateur = require('../models/Utilisateur');
const bcrypt = require('bcrypt');
const authHelper = require('../helpers/auth');
const mailService = require('./mail.service');
const create = async (data) => {
  try {
    const nouvelUtilisateur = new Utilisateur(data);
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

    if (password) {
      const passwordHache = await bcrypt.hash(password, 10);
      data.password = passwordHache;
    }

    data.roleId = roleId;
    let newUser = await create(data);
    return newUser;
  } catch (error) {
    throw error;
  }
}

const inscriptionClient = async (data) => {
  try {
    let roleId = process.env.ROLE_CLIENT;
    data.estActif = true;
    let newUser = await createUser(data, roleId);
    return newUser;
  } catch (error) {
    throw error;
  }
}

const ajoutPersonnel = async (data, roleId) => {
  try {
    let { tokenActivation, expirationToken } = authHelper.generateActivationToken();
    data.tokenActivation = tokenActivation;
    data.expirationToken = expirationToken;
    let newUser = await createUser(data, roleId);
    return newUser;
  } catch (error) {
    throw error;
  }
}

const ajoutEmploye = async (data) => {
  try {
    let roleEmplye = process.env.ROLE_EMPLOYE;
    let newUser = await ajoutPersonnel(data, roleEmplye);
    mailService.sendMailActivation(newUser.email, newUser.tokenActivation);
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

const getUserByTokenActivation = async (token) => {
  try {
    let filtre = {
      tokenActivation: token,
      expirationToken: { $gte: Date.now() }
    }
    let update = {
      $set: {
        tokenActivation: null,
        expirationToken: null
      }
    }
    let user = await Utilisateur.findOneAndUpdate(filtre, update, { new: true });
    return user;
  } catch (error) {
    throw error;
  }
}

const activeAndPasswd = async (id, password) => {
  try {
    const passwordHache = await bcrypt.hash(password, 10);
    let update = {
      $set: {
        estActif: true,
        password: passwordHache
      }
    }
    let user = await Utilisateur.findByIdAndUpdate(id, update, { new: true });
    return user;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  inscriptionClient,
  findAll,
  update,
  deleteById,
  ajoutEmploye,
  getUserByTokenActivation,
  activeAndPasswd
};
