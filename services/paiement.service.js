const Paiement = require('../models/Paiement');
const Caisse = require("../models/Caisse");
const Rdv = require("../models/Rdv");
const { ETAT_ANNULE, ETAT_VALIDE, ETAT_CREE } = require('../helpers/constants');
const { ValidationError } = require('../helpers/ValidationError');

// Create
const createPaiement = async (data) => {
    try {
        const paiement = await Paiement.create(data); 
        let dataRdv = {isPaid: true};
        await Rdv.findByIdAndUpdate(paiement?.idrdv,dataRdv);
        return paiement;
    } catch (error) {
        if (error.name === 'ValidationError' || error.code === 11000) {
            throw new ValidationError(error.message)
        } else { 
            console.error('Erreur interne:', error);
            throw error;
        }
        
    }
}

const annulerPaiement = async (id) => {
    try{
        let data  = {etat: ETAT_ANNULE};
        let paiement = await Paiement.findById(id);
        if (!paiement) {
            throw new ValidationError('Paiement non trouvé');
        }
        if(paiement?.etat === ETAT_VALIDE){
            throw new ValidationError("Impossible d'annuler un paiement déjà validé");
        }
        let dataRdv = {isPaid: false};
        await Rdv.findByIdAndUpdate(paiement?.idrdv,dataRdv);
        paiement = await Paiement.findByIdAndUpdate(id,data,{new: true});
        return paiement;
    }catch (error) {
        if (error.name === 'ValidationError' || error.code === 11000) {
            throw new ValidationError(error.message)
        } else { 
            console.error('Erreur interne:', error);
            throw error;
        }
    }
}

const validerPaiement = async (id) => {
    try{
        let data  = {etat: ETAT_VALIDE};
        let paiement = await Paiement.findById(id);
        if (!paiement) {
            throw new ValidationError('Paiement non trouvé');
        }
        if(paiement?.etat === ETAT_ANNULE){
            throw new ValidationError("Impossible de valider un paiement annulé");
        }
        let newPaiement = await Paiement.findByIdAndUpdate(id,data,{new: true});
        let caisse = new Caisse({entree: paiement.montant, sortie: 0,description: ("Validation "+paiement.description)});
        await caisse.save();
        return newPaiement;
    }catch (error) {
        if (error.name === 'ValidationError' || error.code === 11000) {
            throw new ValidationError(error.message)
        } else { 
            console.error('Erreur interne:', error);
            throw error;
        }
    }
}

// Read (liste avec pagination et filtrage)
const getPaiements = async (filter, page = 1, limit = 10) => {
    try {
        const offset = (page - 1) * limit;
        const paiements = await Paiement.find(filter)
            .populate({
                path: 'idModePaiement',
                select: '_id libelle',
            })
            .populate({
                path: 'idrdv',
                select: '_id dateRdv heureRdv',
                // populate: {
                //     path: 'rdvdetails',
                //     select: '_id idEmploye idService debutService finService statusService'
                // }
            })
            // .populate({
            //     path: 'idService',
            //     select: '_id nom delai prix'
            // })
            .skip(offset)
            .limit(limit)
            .sort({ date: -1 }); // tri par date décroissante
        return paiements;
    } catch (error) {
        throw new Error('Impossible de récupérer la liste des paiements');
    }
}

// Update
const updatePaiement = async (id, data) => {
    try {
        let paiement = await Paiement.findById(id);
        if (!paiement) {
            throw new ValidationError('Paiement non trouvé');
        }
        if(paiement?.etat === ETAT_CREE){
            paiement = await Paiement.findByIdAndUpdate(id, data, { new: true });
        }else if(paiement?.etat === ETAT_ANNULE){
            throw new ValidationError("Les paiements annulés ne sont plus modifiables");
        }else if(paiement?.etat === ETAT_VALIDE){
            throw new ValidationError("Les paiements validés ne sont plus modifiables");
        }
        return paiement;
    } catch (error) {
        if (error.name === 'ValidationError' || error.code === 11000) {
            throw new ValidationError(error.message)
        } else { 
            console.error('Erreur interne:', error);
            throw error;
        }
    }
}

// Delete
const deletePaiement = async (id) => {
    try {
        let paiement = await annulerPaiement(id);
        return paiement;
    } catch (error) {
        if (error.name === 'ValidationError' || error.code === 11000) {
            throw new ValidationError(error.message)
        } else { 
            console.error('Erreur interne:', error);
            throw error;
        }
    }
}

module.exports = {
    createPaiement,
    getPaiements,
    updatePaiement,
    deletePaiement,
    annulerPaiement,
    validerPaiement
};
