const Article = require('../models/Article')

const getArticles = async (idCateg, titreArticle) => {
    try {
        let articles;
        let where = {};

        idCateg ? where.categorieId = idCatge : null;
        titreArticle ? where.titre = new RegExp(titreArticle, "i") : null;
        if (idCateg || titreArticle) {
            articles = await Article.find(where).populate('avis');
        }
        else {
            articles = await Article.find();
            console.log(articles);
        }
        return articles;
    } catch (error) {
        console.error('Erreur lors de la récupération des articles :', error);
        throw error;
    }
}

const getArticleById = async (idArticle) => {
    try {
        let article = await Article.findById(idArticle).populate('avis');
        return article;
    } catch (error) {
        throw error;
    }
}


const getArticlesByTitre = async (titre) => {
    try {
        let articles;
        articles = await Article.find({
            titre: titre
        }).populate('avis');
        return articles;
    } catch (error) {
        console.error('Erreur lors de la récupération des articles :', error);
        throw error;
    }
}

const createArticle = async (data) => {
    try {
        const newArticle = new Article(data);
        inserted = await Article.create(newArticle);
        console.log("New Article : ", inserted);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const deleteArticle = async (id) => {
    try {
        await Article.findByIdAndDelete(id);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = {
    getArticles,
    getArticleById,
    createArticle,
    getArticlesByTitre,
    deleteArticle
}
