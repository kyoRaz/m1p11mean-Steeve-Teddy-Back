const horaireService = require('../services/horaire.service');
const userService = require('../services/utilisateur.service');
const outilHelper = require('../helpers/outil');


const controlInput = async (req, res) => {
    try {
        let { idEmploye, heureDebut,heureFin,pauseDebut,pauseFin } = req.body;


        if (!idEmploye || idEmploye === "") {
            res.status(400).json({ message: "idEmploye vide" });
            return false;
        } else {
            let user = await userService.findEmp(idEmploye);
            if (!user) {
                res.status(400).json({ message: "Employé  introuvable" });
                return false;
            }
        }

        if (!heureDebut || !outilHelper.valideFormatHeure(heureDebut)) {
            res.status(400).json({ message: "heureDebut invalide ou vide. Le format attendu est HH:mm:ss." });
            return false;
        }
        if (!heureFin || !outilHelper.valideFormatHeure(heureFin)) {
            res.status(400).json({ message: "heureFin invalide ou vide. Le format attendu est HH:mm:ss." });
            return false;
        }
        
        let estAnterieur =outilHelper.heuretAnterieur(heureDebut,heureFin)
        if(estAnterieur){
            res.status(400).json({ message: "heureFin est Anterieur  à  heureDebut" });
            return false;
        }

        if (!pauseDebut || !outilHelper.valideFormatHeure(pauseDebut)) {
            res.status(400).json({ message: "pauseDebut invalide ou vide. Le format attendu est HH:mm:ss." });
            return false;
        }
        if (!pauseFin || !outilHelper.valideFormatHeure(pauseFin)) {
            res.status(400).json({ message: "pauseFin invalide ou vide. Le format attendu est HH:mm:ss." });
            return false;
        }

            estAnterieur =outilHelper.heuretAnterieur(pauseDebut,pauseFin)
        if(estAnterieur){
            res.status(400).json({ message: "pauseFin est Anterieur  à  pauseDebut" });
            return false;
        }


        return true;
    } catch (error) {
        throw error;
    }
}

exports.create = async (req, res) => {
    try {
        let { idEmploye, heureDebut,heureFin,pauseDebut,pauseFin } = req.body;

        const validateInput = await controlInput(req, res);
        if (validateInput !== true) {
            return;
        }

        let data = { idEmploye, heureDebut,heureFin,pauseDebut,pauseFin };
        let result = await horaireService.create(data);
        res.status(200).json({ message: "Success", result });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error Server" });
    }
}

exports.findAll = async (req, res) => {
    try {
        let list = await horaireService.find();
        res.status(200).json({ resultat: list });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error Server" });
    }
}

exports.checkHoraire = async (req, res) => {
    try {
        let { heureClient } = req.query;
        let list = await horaireService.checkHoraire(null,heureClient);
        res.status(200).json({ size: list.length, resultat: list });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error Server" });
    }
}

exports.findOne = async (req, res) => {
    try {
        let id = req.params.id;
        let result = await horaireService.findById(id);
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
        let idUser = '65bf662353006be666fda322';
        let { heureDebut,heureFin,pauseDebut,pauseFin } = req.body;
        req.bodyidEmploye=idUser;
        const validateInput = await controlInput(req, res);
        if (validateInput !== true) {
            return;
        }

        let data = {heureDebut,heureFin,pauseDebut,pauseFin };

        let list = await horaireService.update(id, data);
        res.status(200).json({ resultat: list });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error Server" });
    }
}

exports.delete = async (req, res) => {
    try {
        let id = req.params.id;
        await horaireService.deleteById(id);
        res.status(200).json({ message: "suppression effectué" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error Server" });
    }
}