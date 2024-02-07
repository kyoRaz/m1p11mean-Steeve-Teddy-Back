const rdvService = require('../services/rdv.service');

exports.create = async (req, res) => {
    try {
        let idUser = '65bf4a4ababc23a0ac0ce336';
        let {dateRdv } = req.body;

        if (!dateRdv || !Date.parse(dateRdv)) {
            return res.status(400).json({ message: "dateRdv est requis et doit être au format DateTime valide." });
        }

        let data = {
            idUser,
            dateCreation : new Date(),
            dateRdv
        }

        let result = await rdvService.create(data);
        return res.status(200).json({ message: "Success", result });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error Server" });
    }
}

exports.findAll = async (req, res) => {
    try {
        let list = await rdvService.find();
        return res.status(200).json({ resultat: list });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error Server" });
    }
}

exports.findOne = async (req, res) => {
    try {
        let id = req.params.id;
        let result = await rdvService.findById(id);
        if(result){
            res.status(200).json({ result });
        }else{
            res.status(404).json({ message :"Entité  introuvable " });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error Server" });
    }
}

exports.update = async (req, res) => {
    try {
        let id = req.params.id;
        let idUser = '65bf4a4ababc23a0ac0ce336';
        let {dateRdv } = req.body;

        if (!dateRdv || !Date.parse(dateRdv)) {
            return res.status(400).json({ message: "dateRdv est requis et doit être au format DateTime valide." });
        }

        let data = {
            idUser,
            dateCreation : new Date(),
            dateRdv
        }

        let list = await rdvService.update(id, data);
        return res.status(200).json({ resultat: list });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error Server" });
    }
}

exports.delete = async (req, res) => {
    try {
        let id = req.params.id;
        await rdvService.deleteById(id);
        return res.status(200).json({ message: "suppression effectué" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error Server" });
    }
}