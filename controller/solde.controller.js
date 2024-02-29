const soldeService = require('../services/solde.service');

exports.create = async (req,res) => {
    try {
        let { idUser, montant } = req.body;
        let data = {
            idUser, montant
        }
        let newsolde = await soldeService.ajoutSolde(data);
        return res.status(200).json({ message: "Success", solde: newsolde });

    } catch (error) {
        console.log(error);
        if (error.name === 'ValidationError' || error.code === 11000) { // Vérifiez le type d'erreur ou le code d'erreur spécifique
            return res.status(400).json({ message: 'Erreur de validation', error: error.message });
        } else { // Gérer les autres erreurs avec un code 500
            console.error('Erreur interne:', error);
            return res.status(500).json({message: "Erreur interne"});
        }
    }
}

exports.getSolde = async (req,res) => {
    try {
        let { idUser} = req.params;
        let newsolde = await soldeService.getSolde(idUser);
        return res.status(200).json({ message: "Success", solde: newsolde });

    } catch (error) {
        console.log(error);
        if (error.name === 'ValidationError' || error.code === 11000) { // Vérifiez le type d'erreur ou le code d'erreur spécifique
            return res.status(400).json({ message: 'Erreur de validation', error: error.message });
        } else { // Gérer les autres erreurs avec un code 500
            console.error('Erreur interne:', error);
            return res.status(500).json({message: "Erreur interne"});
        }
    }
}