const favorisService = require('../services/favoris.service');

exports.getFavUser = async (req, res) => {
    try {
        let { idUser } = req.body;
        var list = await favorisService.getMyFavori(idUser);
        res.status(200);
        res.json({
            status: 200,
            data: list,
            message: "liste des favoris"
        })
    } catch (error) {
        console.log("🚀 ~ file: favori.controller.js:14 ~ exports.getFavUser= ~ error:", error)
        res.status(500).json({
            message: " Une erreur est survenu  au Niveau de serveur"
        });
    }
}

exports.addFavori = async (req, res) => {
    try {
        let { idUser, idArticle } = req.body;
        await favorisService.insertFavori(idUser, idArticle);
        res.status(200);
        res.json({
            status: 200,
            message: "favori inséré"
        })
    } catch (error) {
        console.log("🚀 ~ file: favori.controller.js:31 ~ exports.addFavori= ~ error:", error)
        res.status(500).json({
            message: " Une erreur est survenu  au Niveau de serveur"
        });
    }
}
exports.delete = async (req, res) => {
    try {
        let id = req.params.id;
        await favorisService.deleteFavori(id);
        res.status(200);
        res.json({
            status: 200,
            message: "favori supprimé"
        })
    } catch (error) {
        console.log("🚀 ~ file: favori.controller.js:48 ~ exports.delete ~ error:", error)
        res.status(500).json({
            message: " Une erreur est survenu  au Niveau de serveur"
        });
    }
}

