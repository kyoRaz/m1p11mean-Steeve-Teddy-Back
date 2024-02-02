const Favori = require('../models/Favoris');


const insertFavori = async (idUser, idArticle) => {
    try {
        let data = {
            articleId: idArticle,
            userId: idUser
        }
        const newFav = new Favori(data);
        inserted = await Favori.create(newFav);
        console.log("New Favori : ", inserted);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const getMyFavori = async (id) => {
    try {
        let where = {};
        id ? where.userId = id : null;
        let list = await Favori.find(where).populate('articleId');
        return list;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const deleteFavori = async (id) => {
    try {
        await Favori.findByIdAndDelete(id);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = {
    getMyFavori,
    insertFavori,
    deleteFavori
}