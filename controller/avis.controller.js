const avisService = require('../services/avis.service');

exports.createAvis = async (req, res) => {
    try {
        let { note, commentaire, idUser, images, idArticle } = req.body;
        let dateAvis = new Date();
        let data = {
            note,
            commentaire,
            dateAvis,
            utilisateur: idUser,
            images
        }
        await avisService.createAvis(data, idArticle);
        res.status(200).json({
            status: 200,
            message: "avis inseré"
        });
    } catch (error) {
        console.log("🚀 ~ file: avis.controller.js:7 ~ exports.createAvis= ~ error:", error)
        res.status(500).json({
            message: " Une erreur est survenu  au Niveau de serveur"
        });
    }
}

exports.updateAvis = async (req, res) => {
    try {
        let { id } = req.params.id;
        let { note, commentaire, images } = req.body;
        await avisService.updateAvis(id, note, commentaire, images);
        res.status(200).json({
            status: 200,
            message: "avis mise à jour"
        })
    } catch (error) {
        console.log("🚀 ~ file: avis.controller.js:31 ~ exports.updateAvis= ~ error:", error)
        res.status(500).json({
            message: " Une erreur est survenu  au Niveau de serveur"
        });
    }
}

exports.deleteAvis = async (req, res) => {
    try {
        let id = req.params.id;
        await avisService.deleteAvis(id);
        res.status(200);
        res.json({
            status: 200,
            message: "avis supprimé"
        })
    } catch (error) {
        console.log("🚀 ~ file: avis.controller.js:54 ~ exports.deleteAvis ~ error:", error)
        res.status(500).json({
            message: " Une erreur est survenu  au Niveau de serveur"
        });
    }
}
