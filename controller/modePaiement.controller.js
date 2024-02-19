const modePaiementService = require('../services/modePaiement.service');

exports.create = async (req, res) => {
    try {
        let modePaiement = req.body.modePaiement;
        if (!modePaiement || modePaiement == "") {
            return res.status(400).json({ message: "Bad Request", details: 'Mode de paiement vide' });
        }
        let newModePaiement = await modePaiementService.create(modePaiement);
        return res.status(200).json({ message: "Success", modePaiement: newModePaiement });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error Server" });
    }
}

exports.findAll = async (req, res) => {
    try {
        let list = await modePaiementService.find();
        return res.status(200).json({ resultat: list });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error Server" });
    }
}

exports.update = async (req, res) => {
    try {
        let id = req.params.id;
        let libelle = req.body.modePaiement;
        if (!libelle || libelle == "") {
            return res.status(400).json({ message: "Bad Request", details: 'Mode de paiement vide' });
        }
        let list = await modePaiementService.update(id, { libelle });
        return res.status(200).json({ resultat: list });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error Server" });
    }
}

exports.delete = async (req, res) => {
    try {
        let id = req.params.id;
        await modePaiementService.deleteById(id);
        return res.status(200).json({ message: "suppression effectué" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error Server" });
    }
}