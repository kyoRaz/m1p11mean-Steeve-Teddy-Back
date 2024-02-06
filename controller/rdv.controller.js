const rdvService = require('../services/rdv.service');
const outilHelper = require('../helpers/outil');

exports.create = async (req, res) => {
    try {
        let idUser = '65bf4a4ababc23a0ac0ce336';
        let { dateRdv } = req.body;

        const now = new Date();
        now.setHours(0, 0, 0, 0);

        if (!dateRdv || !Date.parse(dateRdv)) {
            return res.status(400).json({ message: "dateRdv est requis et doit être au format DateTime valide." });
        } else {
            const inputDate = new Date(dateRdv);
            inputDate.setHours(0, 0, 0, 0);

            if (inputDate < now) {
                return res.status(400).json({ message: "dateRdv ne doit pas être une date antérieure à aujourd'hui." });
            }
        }

        let data = {
            idUser,
            dateCreation: new Date(),
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


exports.update = async (req, res) => {
    try {
        let id = req.params.id;
        let { dateRdv } = req.body;


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

        let data = {
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