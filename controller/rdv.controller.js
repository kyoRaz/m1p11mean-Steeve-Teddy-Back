const rdvService = require('../services/rdv.service');
const outilHelper = require('../helpers/outil');


exports.create = async (req, res) => {
    try {
        let idUser = '65bf4a4ababc23a0ac0ce336';
        let { dateRdv, heureRdv } = req.body;

        const now = new Date();
        now.setHours(0, 0, 0, 0);

        if (!dateRdv || !Date.parse(dateRdv)) {
            let errorLog = { message: "dateRdv est requis et doit être au format DateTime valide." };
            console.log("🚀 ~ exports.programmerRdv= ~ errorLog:", errorLog)
            return res.status(400).json(errorLog);
        } else {
            const inputDate = new Date(dateRdv);
            inputDate.setHours(0, 0, 0, 0);

            if (inputDate < now) {
                let errorLog = { message: "dateRdv ne doit pas être une date antérieure à aujourd'hui." };
                console.log("🚀 ~ exports.programmerRdv= ~ errorLog:", errorLog)
                return res.status(400).json(errorLog);
            }
        }

        if (!heureRdv || !outilHelper.valideFormatHeure(heureRdv)) {
            let errorLog = { message: "heureRdv invalide ou vide. Le format attendu est HH:mm:ss." };
            console.log("🚀 ~ exports.programmerRdv= ~ errorLog:", errorLog)
            return res.status(400).json(errorLog);
        }

        let data = {
            idUser,
            dateCreation: new Date(),
            dateRdv,
            heureRdv
        }

        let result = await rdvService.create(data);
        return res.status(200).json({ message: "Success", result });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error Server" });
    }
}

exports.programmerRdv = async (req, res) => {
    try {
        let user = req.user;
        let idUser = user?.id || '65bf4a4ababc23a0ac0ce336';
        let { dateRdv, heureRdv, listDetails } = req.body;

        const now = new Date();
        now.setHours(0, 0, 0, 0);

        if (!dateRdv || !Date.parse(dateRdv)) {
            let errorLog = { message: "dateRdv est requis et doit être au format DateTime valide." };
            console.log("🚀 ~ exports.programmerRdv= ~ errorLog:", errorLog)
            return res.status(400).json(errorLog);
        } else {
            const inputDate = new Date(dateRdv);
            inputDate.setHours(0, 0, 0, 0);

            if (inputDate < now) {
                let errorLog = { message: "dateRdv ne doit pas être une date antérieure à aujourd'hui." };
                console.log("🚀 ~ exports.programmerRdv= ~ errorLog:", errorLog)
                return res.status(400).json(errorLog);
            }
        }

        if (!heureRdv || !outilHelper.valideFormatHeure(heureRdv)) {
            let errorLog = { message: "heureRdv invalide ou vide. Le format attendu est HH:mm:ss." };
            console.log("🚀 ~ exports.programmerRdv= ~ errorLog:", errorLog)
            return res.status(400).json(errorLog);
        }

        let data = {
            idUser,
            dateCreation: new Date(),
            dateRdv,
            heureRdv
        }

        await rdvService.createRdvandDetail(data, listDetails);

        return res.status(200).json({ message: "Success" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error Server" });
    }
}

exports.findAll = async (req, res) => {
    try {
        let { dateDebut, dateFin, idUser, page, limit } = req.query;

        const validationResult = outilHelper.controlIntervalDate(req, res);
        if (validationResult !== true) {
            return;
        }

        if (!page || isNaN(page) || page < 1) {
            page = 1;
        }

        if (!limit || isNaN(limit) || limit < 1) {
            limit = 10;
        }

        let filtre = {
            dateDebut, dateFin, idUser
        }

        let pagination = {
            page,
            limit
        }

        let list = await rdvService.find(filtre, pagination);
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
        if (result) {
            res.status(200).json({ result });
        } else {
            res.status(404).json({ message: "Entité  introuvable " });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error Server" });
    }
}

exports.update = async (req, res) => {
    try {
        let id = req.params.id;
        let { dateRdv, heureRdv } = req.body;

        let rdv = await rdvService.findById(id);
        if (!rdv) {
            return res.status(400).json({ message: "RDV introuvable" });
        }

        const dateCreation = rdv.dateCreation;
        dateCreation.setHours(0, 0, 0, 0);

        if (!dateRdv || !Date.parse(dateRdv)) {
            return res.status(400).json({ message: "dateRdv est requis et doit être au format DateTime valide." });
        } else {
            const inputDate = new Date(dateRdv);
            inputDate.setHours(0, 0, 0, 0);

            if (inputDate < dateCreation) {
                return res.status(400).json({ message: "dateRdv ne doit pas être une date antérieure à aujourd'hui." });
            }
        }


        if (!heureRdv || !outilHelper.valideFormatHeure(heureRdv)) {
            console.log("🚀 ~ controlInput ~ heureRdv:", heureRdv)
            return res.status(400).json({ message: "heureRdv invalide ou vide. Le format attendu est HH:mm:ss." });
        }


        let data = {
            dateRdv,
            heureRdv
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

exports.historiqueRdvUser = async (req, res) => {
    try {
        let idUser = req.params.idUser;
        let { page, limit } = req.query;
        let result = await rdvService.historiqueRdv(idUser, page, limit);
        res.status(200).json({ size: result.length, resultat: result });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error Server" });
    }
}