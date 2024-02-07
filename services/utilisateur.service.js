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
    let list = await Utilisateur.find().populate('roleId');
    return list;
  } catch (error) {
    throw error;
  }
}

const finbByEmail = async (email) => {
  try {
    let user = await Utilisateur.findOne({ email }).populate('roleId');

    return user;
  } catch (error) {
    throw error;
  }
}

const finbById = async (id) => {
  try {
    let user = await Utilisateur.findById(id).populate('roleId');
    return user;
  } catch (error) {
    throw error;
  }
}

const findEmp = async (id) => {
  try {
    let user = await Utilisateur.findById(id).populate('roleId');

    let idRole = process.env.ROLE_EMPLOYE;
    if (user && user.roleId && user.roleId._id.toString() === idRole) {
      return user; 
    } else {
      return null; 
    }
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

const withoutPassword = (user) => {
  user = user?._doc;
  const { password, tokenActivation, expirationToken, ...monUser } = user;
  return monUser;
}

const getListEmploye = async () => {
  try {
    let list = await Utilisateur.find({
      roleId: process.env.ROLE_EMPLOYE
    }).populate('roleId');
    return list;
  } catch (error) {
    throw error;
  }
}

const findAndFilter = async (filter, orderBy, page, limit) => {
  try {
    const skip = (page - 1) * limit;

    const query = {};

    if (filter) {
      Object.assign(query, filter);
    }

    const sort = {};

    if (orderBy) {
      const [field, order] = orderBy.split(':'); // Split de "fieldName:order" en tableau
      sort[field] = order === 'desc' ? -1 : 1; // -1 pour décroissant, 1 pour croissant
    }

    const totalDocuments = await Utilisateur.countDocuments(query);

    const users = await Utilisateur.find(query)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit))
      .exec();

    const totalPages = Math.ceil(totalDocuments / parseInt(limit));

    return {
      total: totalDocuments,
      totalPages: totalPages,
      page: parseInt(page),
      limit: parseInt(limit),
      users: users,
    };
  } catch (error) {
    throw error;
  }
};


module.exports = {
  inscriptionClient,
  findAll,
  update,
  deleteById,
  ajoutEmploye,
  getUserByTokenActivation,
  activeAndPasswd,
  finbByEmail,
  withoutPassword,
  getListEmploye,
  findAndFilter,
  finbById,
  findEmp
};
