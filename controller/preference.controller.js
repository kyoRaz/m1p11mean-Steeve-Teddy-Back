const prefService = require('../services/preference.service');

exports.create = async (req, res) => {
    try {
        let user = req.user;
        let idUser = user?.id || '65bf4a4ababc23a0ac0ce336';
        let { idService, idEmpFav } = req.body;

        if (!idService || idService == "") {
            let errorLog = { message: "Bad Request", details: 'idService vide' };
            console.log("🚀 ~ exports.create= ~ errorLog:", errorLog)
            return res.status(400).json(errorLog);
        }

        if (!idEmpFav || idEmpFav == "") {
            let errorLog = { message: "Bad Request", details: 'idEmpFav vide' };
            console.log("🚀 ~ exports.create= ~ errorLog:", errorLog)
            return res.status(400).json(errorLog);
        }

        let data = {
            idService,
            idEmpFav,
            idUser
        }

        let prefWithService = await prefService.findOne({ idUser, idService });
        if (prefWithService) {
            let errorLog = { message: "Bad Request", details: 'Une  Preference avec ce  service existe deja' };
            console.log("🚀 ~ exports.create= ~ errorLog:", errorLog);
            return res.status(400).json(errorLog);
        }


        let pref = await prefService.findOne(data);
        if (pref) {
            let errorLog = { message: "Bad Request", details: 'Cette  Preference existe deja' };
            console.log("🚀 ~ exports.create= ~ errorLog:", errorLog);
            return res.status(400).json(errorLog);
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
        let user = req.user;
        let idUser = user?.id || '65bf4a4ababc23a0ac0ce336';
        let list = await prefService.find(idUser);
        return res.status(200).json({ resultat: list });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error Server" });
    }
}

exports.update = async (req, res) => {
    try {
        let id = req.params.id;
        let user = req.user;
        let idUser = user?.id || '65bf4a4ababc23a0ac0ce336';
        let { idService, idEmpFav } = req.body;

        if (!idService || idService == "") {
            return res.status(400).json({ message: "Bad Request", details: 'idService vide' });
        }

        if (!idEmpFav || idEmpFav == "") {
            return res.status(400).json({ message: "Bad Request", details: 'idEmpFav vide' });
        }

        let data = {
            idService,
            idEmpFav,
            idUser
        }

        let list = await prefService.update(id, data);
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