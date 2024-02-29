const { default: mongoose } = require("mongoose");
const { ValidationError } = require("../helpers/ValidationError");
const Solde = require("../models/Solde");
const Utilisateur = require("../models/Utilisateur");

const ajoutSolde = async (data) => {
    try {
        const {montant,idUser} = data;
        if(!montant){
            throw new ValidationError("Veuillez préciser le montant");
        }else{
            if(montant<=0){
                throw new ValidationError("Veuillez insérer un montant valide strictement positif");
            }
        }
        const utilisateur = Utilisateur.findById(idUser);
        if(!utilisateur){
            throw new ValidationError("Utilisation introuvable");
        }
        let solde = new Solde(data);
        const newSolde = await solde.save();
        return newSolde;
    } catch (error) {
        throw error;
    }
};

const enleverSolde = async (data) => {
    try {
        const {montant,idUser} = data;
        if(!montant){
            throw new ValidationError("Veuillez préciser le montant");
        }else{
            if(montant>=0){
                throw new ValidationError("Veuillez insérer un montant valide strictement négatif");
            }
        }
        const utilisateur = Utilisateur.findById(idUser);
        if(!utilisateur){
            throw new ValidationError("Utilisation introuvable");
        }
        let solde = new Solde(data);
        const newSolde = await solde.save();
        return newSolde;
    } catch (error) {
        throw error;
    }
};

const getSolde = async (idUser) => {
    try{
        const soldeTotal = Solde.aggregate([
            {
                $match: { idUser: new mongoose.Types.ObjectId(idUser) } // Filtre les documents par l'ID d'utilisateur spécifié
            },
            {
                $group: {
                    _id: null, // Groupement sur l'ensemble des documents correspondants
                    total: { $sum: "$montant" } // Calcule la somme des montants
                }
            }
        ]);

        return soldeTotal?.total ? soldeTotal?.total : 0
    } catch (error) {
        throw error;
    }
}


module.exports = {
    ajoutSolde,
    getSolde,
    enleverSolde
}