const deviceService = require('../services/deviceToken.service');

exports.checkToken = async (req, res) => {
    try {
        const token = req.body.token;
        if (!token) {
            res.status(400).json({
                status: 200,
                message: "Paramètre token non spécifié"
            })
        } else {
            await deviceService.updateDeviceToken(token);
            res.status(200).json({
                status: 200,
                message: "Traitement du token réussi"
            })
        }
    } catch (error) {
        res.status(400).json({
            status: 400,
            message: "Une erreur s'est produite"
        })
    }
}

exports.getAllToken = async (req, res) => {
    try {
        let data = await deviceService.getAllToken();
        res.status(200).json({
            status: 200,
            message: "Récupération des données réussi",
            data: data
        })
    } catch (error) {
        res.status(400).json({
            status: 400,
            message: "Une erreur s'est produite"
        })
    }
}