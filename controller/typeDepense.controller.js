const typeDepenseService = require('../services/typeDepense.service');

exports.create = async (req, res) => {
    try {
        let typeDepense = req.body.typeDepense;
        if (!typeDepense || typeDepense == "") {
            return res.status(400).json({ message: "Bad Request", details: 'Type de dépense vide' });
        }
        let newTypeDepense = await typeDepenseService.create(typeDepense);
        return res.status(200).json({ message: "Success", typeDepense: newTypeDepense });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error Server" });
    }
}

exports.findAll = async (req, res) => {
    try {
        let list = await typeDepenseService.find();
        return res.status(200).json({ resultat: list });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error Server" });
    }
}

exports.update = async (req, res) => {
    try {
        let id = req.params.id;
        let libelle = req.body.typeDepense;
        if (!libelle || libelle == "") {
            return res.status(400).json({ message: "Bad Request", details: 'Type de dépense vide' });
        }
        let list = await typeDepenseService.update(id, { libelle });
        return res.status(200).json({ resultat: list });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error Server" });
    }
}

exports.delete = async (req, res) => {
    try {
        let id = req.params.id;
        await typeDepenseService.deleteById(id);
        return res.status(200).json({ message: "suppression effectué" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error Server" });
    }
}