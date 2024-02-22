const { isNumber, casteNbr } = require('../helpers/outil');
const paiementService = require('../services/paiement.service');
const rdvService = require('../services/rdv.service');



// Controller pour la création d'un paiement
const createPaiement = async (req, res,next) => {
    try {
        let data = req.body;
        let {date,montant,description,idrdv} = data

        if(!idrdv){
            return res.status(400).json({message: "Bad Request",details: "Veuillez préciser le rendez-vous !"});
        }else{
            const rdv = await rdvService.findById(idrdv);
            if(!rdv){
                return res.status(400).json({message: "Bad Request",details: "Veuillez préciser un rendez-vous existant !"});
            }
        }

        //controle descritpion
        if(!description){
            return res.status(400).json({message: "Bad Request",details: "Veuillez remplir la description !"});
        }

        // controle date
        if(!date){
            return res.status(400).json({message: "Bad Request",details: "Veuillez remplir la date de paiement !"});
        }else{
            date = new Date(date);
            date.setHours(0, 0, 0, 0);
            const now = new Date();
            now.setHours(0, 0, 0, 0);
            if (date < now) {
                return res.status(400).json({ message: "La date ne doit pas être une date antérieure à aujourd'hui." });
            }
        }

        // controle montant
        if(!montant){
            return res.status(400).json({message: "Bad Request",details: "Veuillez remplir le montant !"});
        }else{
            if(!isNumber(montant)){
                return res.status(400).json({message: "Bad Request",details: "Veuillez saisir un nombre !"});
            }else{
                montant = casteNbr(montant);
                if(montant<0){
                    return res.status(400).json({message: "Bad Request",details: "Veuillez saisir un montant positif!"});
                }
            }
        }

        const paiement = await paiementService.createPaiement(data);
        return res.status(200).json({message: "Success", paiement: paiement});
    } catch (error) {
        console.log(error);
        if (error.name === 'ValidationError' || error.code === 11000) { // Vérifiez le type d'erreur ou le code d'erreur spécifique
            return res.status(400).json({ message: 'Erreur de validation', error: error.message });
        } else { // Gérer les autres erreurs avec un code 500
            console.error('Erreur interne:', error);
            return res.status(500).json({message: "Erreur interne"});
        }
    }
};

// Controller pour récupérer une liste paginée de paiements
const getPaiements = async (req, res) => {
    try {
        let { page, limit ,...filter } =  req.body;
        const paiements = await paiementService.getPaiements(filter, parseInt(page), parseInt(limit));
        return res.status(200).json({size: paiements?.length, resultat: paiements});
    } catch (error) {
        console.log(error);
        if (error.name === 'ValidationError' || error.code === 11000) { // Vérifiez le type d'erreur ou le code d'erreur spécifique
            return res.status(400).json({ message: 'Erreur de validation', error: error.message });
        } else { // Gérer les autres erreurs avec un code 500
            console.error('Erreur interne:', error);
            return res.status(500).json({message: "Erreur interne"});
        }
    }
};

// Controller pour mettre à jour un paiement
const updatePaiement = async (req, res) => {
  
    try {
        const { id } = req.params;
        let {date,montant,description,idrdv} = req.body;
        if(!idrdv){
            return res.status(400).json({message: "Bad Request",details: "Veuillez préciser le rendez-vous !"});
        }else{
            const rdv = await rdvService.findById(idrdv);
            if(!rdv){
                return res.status(400).json({message: "Bad Request",details: "Veuillez préciser un rendez-vous existant !"});
            }
        }

        //controle descritpion
        if(!description){
            return res.status(400).json({message: "Bad Request",details: "Veuillez remplir la description !"});
        }

        // controle date
        if(!date){
            return res.status(400).json({message: "Bad Request",details: "Veuillez remplir la date de paiement !"});
        }else{
            date = new Date(date);
            date.setHours(0, 0, 0, 0);
            const now = new Date();
            now.setHours(0, 0, 0, 0);
            if (date < now) {
                return res.status(400).json({ message: "La date ne doit pas être une date antérieure à aujourd'hui." });
            }
        }

        // controle montant
        if(!montant){
            return res.status(400).json({message: "Bad Request",details: "Veuillez remplir le montant !"});
        }else{
            if(!isNumber(montant)){
                return res.status(400).json({message: "Bad Request",details: "Veuillez saisir un nombre !"});
            }else{
                montant = casteNbr(montant);
                if(montant<0){
                    return res.status(400).json({message: "Bad Request",details: "Veuillez saisir un montant positif!"});
                }
            }
        }

        const paiement = await paiementService.updatePaiement(id, req.body);
        return res.status(200).json({message: "Success", paiement: paiement});
    } catch (error) {
        console.log(error);
        if (error.name === 'ValidationError' || error.code === 11000) { // Vérifiez le type d'erreur ou le code d'erreur spécifique
            return res.status(400).json({ message: 'Erreur de validation', error: error.message });
        } else { // Gérer les autres erreurs avec un code 500
            console.error('Erreur interne:', error);
            return res.status(500).json({message: "Erreur interne"});
        }
    }
};

// Controller pour supprimer un paiement
const deletePaiement = async (req, res) => {
    const { id } = req.params;
    try {
        const paiement = await paiementService.deletePaiement(id);
        return res.status(200).json({message: "Success", paiement: paiement});
    } catch (error) {
        console.log(error);
        if (error.name === 'ValidationError' || error.code === 11000) { // Vérifiez le type d'erreur ou le code d'erreur spécifique
            return res.status(400).json({ message: 'Erreur de validation', error: error.message });
        } else { // Gérer les autres erreurs avec un code 500
            console.error('Erreur interne:', error);
            return res.status(500).json({message: "Erreur interne"});
        }
    }
};

// Annuler un paiement
const annulerPaiement = async (req, res) => {
    const { id } = req.params;
    try {
        const paiement = await paiementService.annulerPaiement(id);
        return res.status(200).json({message: "Success", paiement: paiement});
    } catch (error) {
        console.log(error);
        if (error.name === 'ValidationError' || error.code === 11000) { // Vérifiez le type d'erreur ou le code d'erreur spécifique
            return res.status(400).json({ message: 'Erreur de validation', error: error.message });
        } else { // Gérer les autres erreurs avec un code 500
            console.error('Erreur interne:', error);
            return res.status(500).json({message: "Erreur interne"});
        }
    }
};

// Valider un paiement
const validerPaiement = async (req, res) => {
    const { id } = req.params;
    try {
        const paiement = await paiementService.validerPaiement(id);
        return res.status(200).json({message: "Success", paiement: paiement});s
    } catch (error) {
        console.log(error);
        if (error.name === 'ValidationError' || error.code === 11000) { // Vérifiez le type d'erreur ou le code d'erreur spécifique
            return res.status(400).json({ message: 'Erreur de validation', error: error.message });
        } else { // Gérer les autres erreurs avec un code 500
            console.error('Erreur interne:', error);
            return res.status(500).json({message: "Erreur interne"});
        }
    }
};

module.exports = {
    createPaiement,
    getPaiements,
    updatePaiement,
    deletePaiement,
    annulerPaiement,
    validerPaiement
};
