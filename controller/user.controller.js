const utilisateurService = require('../services/utilisateur.service');
const outil = require('../helpers/outil')


exports.getListUser = async (req, res) => {
    try {
        let list = await utilisateurService.getAllUser();
        res.status(200).json({
            data: list
        });
    } catch (error) {
        res.status(500).json({ message: "Error Server" });
    }
}

const controlBody = (req, res) => {
    const { nom, prenom, email } = req.body;

    let isMail = outil.isValidEmail(email);
    if (!nom || nom == "") {
        res.status(400).json({ message: 'Bad Request', details: "Le nom ne  doit pas  être pas  vide" });
        return false;
    }
    if (!prenom || prenom == "") {
        res.status(400).json({ message: 'Bad Request', details: "Le prenom ne  doit pas  être pas  vide" });
        return false;
    }
    if (!isMail) {
        res.status(400).json({ message: 'Bad Request', details: "L\'adresse e-mail est invalide." });
        return false;
    }
    return true;
}

const controlPassword = (req, res) => {
    const { password } = req.body;

    if (!password || password == "") {
        res.status(400).json({ message: 'Bad Request', details: "les mots de passe est vide" });
        return false;
    } else {
        let isSup = outil.isValidMinimumLength(password);
        if (!isSup) {
            res.status(400).json({ message: 'Bad Request', details: "les mots de passe inferieur à 8 caractéres" });
            return false;
        }
    }
    return true;
}


exports.signUp = async (req, res) => {
    try {
        const { nom, prenom, email, password, roleId } = req.body;
        // Control des  inputs
        const validationResult = controlBody(req, res);
        if (validationResult !== true) {
            return;
        }
        const palidPassword = controlPassword(req, res);
        if (palidPassword !== true) {
            return;
        }
        let data = {
            nom,
            prenom,
            email,
            password,
            roleId
        };
        const nouvelUtilisateur = await utilisateurService.inscriptionClient(data);
        res.status(200).json(nouvelUtilisateur);
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "Bad Request", details: error.message });
    }
}

exports.createEmploye = async (req, res) => {
    try {
        const { nom, prenom, email } = req.body;
        const validationResult = controlBody(req, res);
        if (validationResult !== true) {
            return;
        }
        let data = {
            nom,
            prenom,
            email,
        };
        const nouvelUtilisateur = await utilisateurService.ajoutEmploye(data);
        res.status(200).json(nouvelUtilisateur);
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "Bad Request", details: error.message });
    }
}