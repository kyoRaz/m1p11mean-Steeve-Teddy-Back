const rdvDetailService = require('../services/rdvDetail.service');
const rdvService = require('../services/rdv.service');
const srvService = require('../services/service.service');
const userService = require('../services/utilisateur.service');
const outilHelper = require('../helpers/outil');


const controlInput = async (req, res) => {
    try {
        let { idRdv, idService, idEmploye, debutService, finService } = req.body;

        let rdv;
        if (!idRdv || idRdv == "") {
            res.status(400).json({ message: "idRdv vide" });
            return false;
        } else {
            rdv = await rdvService.findById(idRdv);
            if (!rdv) {
                res.status(400).json({ message: "RDV  introuvable" });
                return false;
            }
        }

        if (!idService || idService === "") {
            res.status(400).json({ message: "idService vide" });
        } else {
            rdv = await srvService.findById(idService);
            if (!rdv) {
                res.status(400).json({ message: "Service  introuvable" });
                return false;
            }
        }

        if (!idEmploye || idEmploye === "") {
            res.status(400).json({ message: "idEmploye vide" });
            return false;
        } else {
            rdv = await userService.findEmp(idEmploye);
            if (!rdv) {
                res.status(400).json({ message: "Employé  introuvable" });
                return false;
            }
        }

        if (!debutService || !outilHelper.valideFormatHeure(debutService)) {
            console.log("🚀 ~ controlInput ~ debutService:", debutService)
            res.status(400).json({ message: "debutService invalide ou vide. Le format attendu est HH:mm:ss." });
            return false;
        }

        if (!finService || !outilHelper.valideFormatHeure(finService)) {
            console.log("🚀 ~ controlInput ~ finService:", finService)
            res.status(400).json({ message: "finService invalide ou vide. Le format attendu est HH:mm:ss." });
            return false;
        }



        return true;
    } catch (error) {
        throw error;
    }
}

exports.create = async (req, res) => {
    try {
        let { idRdv, idService, idEmploye, debutService, finService } = req.body;

        const validateInput = await controlInput(req, res);
        if (validateInput !== true) {
            return;
        }

        let rdv = await rdvService.findById(idRdv);
        // let dateRdv = rdv.dateRdv;
        // let horaireService = outilHelper.ajusterHeureDate(dateRdv, heure);
        let data = {
            idRdv,
            idService,
            idEmploye,
            debutService,
            finService,
            statusService: "Nouveau"
        }

        let result = await rdvDetailService.create(data);
        res.status(200).json({ message: "Success", result });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error Server" });
    }
}

exports.findAll = async (req, res) => {
    try {
        let list = await rdvDetailService.find();
        res.status(200).json({ resultat: list });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error Server" });
    }
}

exports.findIntervale = async (req, res) => {
    try {
        let { heureDebut, heureFin } = req.body;
        let list = await rdvDetailService.findByIntervale(heureDebut, heureFin);
        res.status(200).json({ size: list.length, resultat: list });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error Server" });
    }
}

exports.findOne = async (req, res) => {
    try {
        let id = req.params.id;
        let result = await rdvDetailService.findById(id);
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

exports.historiqueRdvUser = async (req, res) => {
    try {
        let idUser = req.params.idUser;
        let {page,limit} = req.query;
        console.log(page,limit);
        let result = await rdvDetailService.historiqueRdvUsers(idUser,page,limit);
        if (result) {
            res.status(200).json({ size: result.length , resultat: result });
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
        let idUser = '65bf4a4ababc23a0ac0ce336';
        let { dateRdv } = req.body;

        if (!dateRdv || !Date.parse(dateRdv)) {
            res.status(400).json({ message: "dateRdv est requis et doit être au format DateTime valide." });
        }

        let data = {
            idUser,
            dateCreation: new Date(),
            dateRdv
        }

        let list = await rdvDetailService.update(id, data);
        res.status(200).json({ resultat: list });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error Server" });
    }
}

exports.delete = async (req, res) => {
    try {
        let id = req.params.id;
        await rdvDetailService.deleteById(id);
        res.status(200).json({ message: "suppression effectué" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error Server" });
    }
}