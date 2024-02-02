const Avis = require('../models/Avis')
const Article = require('../models/Article')

const createAvis = async (data, idArticle) => {
    try {
        const newAvis = new Avis(data);
        inserted = await Avis.create(newAvis);
        console.log("New Avis : ", inserted);
        Article.findByIdAndUpdate(idArticle, { $push: { avis: inserted._id } }, { new: true })
            .then(updatedArticle => {
                console.log('Article mis à jour :', updatedArticle);
            })
            .catch(err => {
                console.error('Erreur lors de la mise à jour de l\'article :', err);
            });
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const updateAvis = async (id, note, comms, images) => {
    try {
        let updateColumn = {};
        note ? updateColumn.note = note : null;
        comms ? updateColumn.commentaire = comms : null;
        images ? updateColumn.images = images : null;
        await Avis.findOneAndUpdate(
            { id },
            updateColumn,
            { new: true }
        );
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const deleteAvis = async (id) => {
    try {
        await Avis.findByIdAndDelete(id);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = {
    createAvis,
    updateAvis,
    deleteAvis
}
