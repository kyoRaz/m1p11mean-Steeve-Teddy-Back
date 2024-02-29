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
        res.status(500).json({ message: "Error Server" });
    }
}

exports.getSolde = async (req,res) => {
    try {
        let { idUser} = req.params;
        let newsolde = await soldeService.getSolde(idUser);
        return res.status(200).json({ message: "Success", solde: newsolde });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error Server" });
    }
}