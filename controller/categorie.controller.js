const categorieService = require('../services/categorie.service');

exports.getListCategorie = async (req, res) => {
    try {
        var categories = await categorieService.getAllCategories();
        res.status(200);
        res.json({
            status: 200,
            data: categories,
            message: ""
        })
    } catch (error) {
        console.log("🚀 ~ file: categorie.controller.js:7 ~ exports.getListCategorie= ~ error:", error)
        res.status(500).json({
            message: " Une erreur est survenu  au Niveau de serveur"
        });
    }
}