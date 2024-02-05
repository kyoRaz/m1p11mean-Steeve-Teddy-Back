const utilisateurService = require('../services/utilisateur.service');
const outil = require('../helpers/outil')


exports.getListUser = async (req, res) => {
    try {
        let list = await utilisateurService.getAllUser();
        return res.status(200).json({
            data: list
        });
    } catch (error) {
        return res.status(500).json({ message: "Error Server" });
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
        return res.status(200).json(nouvelUtilisateur);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error.message });
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
        await utilisateurService.ajoutEmploye(data);
        return res.status(200).json({ message: "nouvel  utilisateur  ajouté " });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error.message });
    }
}

exports.activationUser = async (req, res) => {
    try {

        const token = req.body.token;

        let user = await utilisateurService.getUserByTokenActivation(token);
        if (!user) {
            return res.status(400).json({ message: "Bad Request", details: "Token expiré" });
        }
        return res.status(200).json({ id: user._id });

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error.message });
    }
}

const confirmPassword = (req, res) => {
    let { password, confirmPWD } = req.body
    let isPwd = outil.isValidPassword(password, confirmPWD);
    if (!isPwd) {
        res.status(400).json({ message: 'Bad Request', details: "les mots de passe ne correspendent pas", body: "password" });
        return false;
    } else {
        let isSup = outil.isValidMinimumLength(password);
        if (!isSup) {
            res.status(400).json({ message: 'Bad Request', details: "les mots de passe inferieur à 8 caractéres", body: "password" });
            return false;
        }
    }
    return true;
}

exports.activeAndPasswd = async (req, res) => {
    try {

        const { idUser, password } = req.body;
        const validPwd = confirmPassword(req, res)
        if (validPwd !== true) {
            return;
        }

        let user = await utilisateurService.activeAndPasswd(idUser, password);
        if (!user) {
            return res.status(400).json({ message: "Bad Request", details: "Utilisateur  introuvable" });
        }
        return res.status(200).json({ message: "modification effectué" });

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error.message });
    }
}

exports.listEmploye = async (req, res) => {
    try {

        let list = await utilisateurService.getListEmploye();
        return res.status(200).json({ resultat: list });

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error.message });
    }
}

exports.findAll = async (req, res) => {
    
    try {
        let { page, limit, filter } = req.query;
    
        if (!page || isNaN(page) || page < 1) {
            page = 1;
        }
    
        if (!limit || isNaN(limit) || limit < 1) {
            limit = 10;
        }
    
        let result =  await  utilisateurService.findAndFilter(filter, null, page, limit);

        return res.status(200).json(result);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Une erreur s\'est produite' });
    }
}