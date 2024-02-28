const rdvDetailService = require('../services/rdvDetail.service');
const rdvService = require('../services/rdv.service');
const srvService = require('../services/service.service');
const userService = require('../services/utilisateur.service');
const outilHelper = require('../helpers/outil');
const { STATUT_RDV_NOUVEAU, STATUT_RDV_ANNULE, STATUT_RDV_FINI, STATUT_RDV_EN_COURS } = require('../helpers/constants');


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
            statusService: STATUT_RDV_NOUVEAU
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
        let { page, limit } = req.query;
        let result = await rdvDetailService.historiqueRdvUsers(idUser, page, limit);
        if (result) {
            res.status(200).json({ size: result.length, resultat: result });
        } else {
            res.status(404).json({ message: "Entité  introuvable " });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error Server" });
    }
}

exports.commissionObtenuEmploye = async (req, res) => {
    try {
        let idEmploye = req.params.idEmploye;
        let date = req.query.date;
        let result = await rdvDetailService.commissionObtenuEmploye(idEmploye, date);
        if (result) {
            res.status(200).json({ resultat: result });
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
        let user = req.user;
        let idUser = user?.id;
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

exports.annulerRdv = async (req, res) => {
    try {
        let id = req.params.id;
        const data = { statusService: STATUT_RDV_ANNULE };
        let result = await rdvDetailService.update(id, data);
        res.status(200).json({ resultat: result });
    } catch (error) {
        console.log(error);
        if (error.name === 'ValidationError' || error.code === 11000) { // Vérifiez le type d'erreur ou le code d'erreur spécifique
            return res.status(400).json({ message: 'Erreur de validation', error: error.message });
        } else { // Gérer les autres erreurs avec un code 500
            console.error('Erreur interne:', error);
            return res.status(500).json({ message: "Erreur interne", details: error?.message });
        }
    }
}

exports.commencerRdv = async (req, res) => {
    try {
        let id = req.params.id;
        const data = { statusService: STATUT_RDV_EN_COURS };
        let result = await rdvDetailService.update(id, data);
        res.status(200).json({ resultat: result });
    } catch (error) {
        console.log(error);
        if (error.name === 'ValidationError' || error.code === 11000) { // Vérifiez le type d'erreur ou le code d'erreur spécifique
            return res.status(400).json({ message: 'Erreur de validation', error: error.message });
        } else { // Gérer les autres erreurs avec un code 500
            console.error('Erreur interne:', error);
            return res.status(500).json({ message: "Erreur interne", details: error?.message });
        }
    }
}

exports.finirRdv = async (req, res) => {
    try {
        let id = req.params.id;
        const data = { statusService: STATUT_RDV_FINI };
        let result = await rdvDetailService.update(id, data);
        res.status(200).json({ resultat: result });
    } catch (error) {
        console.log(error);
        if (error.name === 'ValidationError' || error.code === 11000) { // Vérifiez le type d'erreur ou le code d'erreur spécifique
            return res.status(400).json({ message: 'Erreur de validation', error: error.message });
        } else { // Gérer les autres erreurs avec un code 500
            console.error('Erreur interne:', error);
            return res.status(500).json({ message: "Erreur interne", details: error?.message });
        }
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

exports.getTacheEffectuer = async (req, res) => {
    try {
        const { idUser } = req.params;
        const { debut, fin, page, pageSize } = req.query;

        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if ((!debut || !fin || !dateRegex.test(debut) || !dateRegex.test(fin)) && (debut || fin)) {
            return res.status(400).json({ message: "Les dates doivent être au format YYYY-MM-DD." });
        }

        const pageNum = parseInt(page, 10) || 1;
        const pageSizeNum = parseInt(pageSize, 10) || 10;

        const result = await rdvDetailService.getTacheEffectue(idUser, debut, fin, pageNum, pageSizeNum);

        return res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error Server" });
    }
};

exports.rdvEmployes = async (req, res) => {
    try {
        const { idEmploye, date, page, limit } = req.query;
        const result = await rdvDetailService.rdvEmployes(idEmploye, page, limit, date);
        return res.status(200).json({ size: result.length, resultat: result });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error Server" });
    }
}

exports.rdvEmployesFiniEtNonCommence = async (req, res) => {
    try {
        const { idEmploye, date, page, limit } = req.query;
        const resultPasCommence = await rdvDetailService.rdvEmployes(idEmploye, page, limit, date, STATUT_RDV_NOUVEAU);
        const resultFini = await rdvDetailService.rdvEmployes(idEmploye, page, limit, date, STATUT_RDV_FINI);
        return res.status(200).json({ fini: resultFini, nouveau: resultPasCommence });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error Server" });
    }
}
