const Categorie = require('../models/Categorie')

const getAllCategories = async () => {
  try {
    const categories = await Categorie.find();
    return categories;
  } catch (error) {
    console.error('Erreur lors de la récupération des catégories :', error);
    throw error;
  }
}

const getById = async (idCateg) => {
  try {
    const categorie = await Categorie.findById(idCateg);
    return categorie;
  } catch (error) {
    console.error('Erreur lors de la récupération de la catégorie :', error);
    throw error;
  }
}

module.exports = {
  getAllCategories,
  getById
}

