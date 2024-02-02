const articleService = require('../services/article.service');

exports.getListArticle = async (req, res) => {
    try {
        let { categorieId, titre } = req.body;
        var articles = await articleService.getArticles(categorieId, titre);
        res.status(200);
        res.json({
            status: 200,
            data: articles,
            message: "liste d'articles"
        })

    } catch (error) {
        console.log("🚀 ~ file: article.controller.js:15 ~ exports.getListArticle= ~ error:", error)
        res.status(500).json({
            message: " Une erreur est survenu  au Niveau de serveur"
        });
    }
}

exports.createArticle = async (req, res) => {
    try {
        let { titre, description, images, videos, avis, idCategorie } = req.body;
        let datecreation = new Date();
        let data = {
            titre,
            description,
            images,
            videos,
            datecreation,
            avis,
            idCategorie
        }
        await articleService.createArticle(data);
        res.status(200);
        res.json({
            status: 200,
            message: "articles inseré"
        })

    } catch (error) {
        console.log("🚀 ~ file: article.controller.js:43 ~ exports.createArticle= ~ error:", error)
        res.status(500).json({
            message: " Une erreur est survenu  au Niveau de serveur"
        });
    }
}

exports.getById = async (req, res) => {
    try {
        let id = req.params.id;
        let article = await articleService.getArticleById(id);
        res.status(200);
        res.json({
            status: 200,
            data: article,
            message: ""
        })
    } catch (error) {
        console.log("🚀 ~ file: article.controller.js:54 ~ exports.getById= ~ error:", error)
        res.status(500).json({
            message: " Une erreur est survenu  au Niveau de serveur"
        });
    }
}

exports.deleteArticle = async (req, res) => {
    try {
        let id = req.params.id;
        await articleService.deleteArticle(id);
        res.status(200);
        res.json({
            status: 200,
            message: "article supprimé"
        })
    } catch (error) {
        console.log("🚀 ~ file: article.controller.js:72 ~ exports.deleteArticle ~ error:", error)
        res.status(500).json({
            message: " Une erreur est survenu  au Niveau de serveur"
        });
    }

}