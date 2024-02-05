const prefService = require('../services/preference.service');

exports.create = async (req, res) => {
    try {
        let {idService,idUser} = req.body;

        if (!idService || idService == "") {
            return res.status(400).json({ message: "Bad Request", details: 'idService vide' });
        }

        if (!idUser || idUser == "") {
            return res.status(400).json({ message: "Bad Request", details: 'idUser vide' });
        }

        let data ={
            idService,
            idEmpFav: idUser
        }
        let result = await prefService.create(data);
        return res.status(200).json({ message: "Success", result });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error Server" });
    }
}

exports.findAll = async (req, res) => {
    try {
        let list = await prefService.find();
        return res.status(200).json({ resultat: list });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error Server" });
    }
}

exports.update = async (req, res) => {
    try {
        let id = req.params.id;
        let {idService,idUser} = req.body;

        if (!idService || idService == "") {
            return res.status(400).json({ message: "Bad Request", details: 'idService vide' });
        }

        if (!idUser || idUser == "") {
            return res.status(400).json({ message: "Bad Request", details: 'idUser vide' });
        }

        let data ={
            idService,
            idEmpFav: idUser
        }
        let list = await prefService.update(id,data);
        return res.status(200).json({ resultat: list });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error Server" });
    }
}

exports.delete = async (req, res) => {
    try {
        let id = req.params.id;
        await prefService.deleteById(id);
        return res.status(200).json({ message: "suppression effectué" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error Server" });
    }
}