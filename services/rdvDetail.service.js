const mongoose = require('mongoose');
const RdvDetail = require('../models/RdvDetail');
const horaireService = require('./horaire.service');

const create = async (data) => {
    try {
        let rdv = new RdvDetail(data);
        const newObject = await rdv.save();
        return newObject;
    } catch (error) {
        throw error;
    }
}

const createDetail = async (idRdv, detail, session) => {
    try {
        let data = {
            idRdv,
            idService: detail.idService,
            idEmploye: detail.idEmploye,
            debutService: detail.debutService,
            finService: detail.finService,
            statusService: "Nouveau"
        }
        let rdv = new RdvDetail(data);
        const newObject = await rdv.save({ session });
        return newObject;
    } catch (error) {
        throw error;
    }
}

const find = async () => {
    try {
        let list = await RdvDetail.find().populate({
            path: 'idEmploye',
            select: '_id nom prenom',
        }).populate('idService');;
        return list;
    } catch (error) {
        throw error;
    }
}

const findById = async (id) => {
    try {
        let result = await RdvDetail.findById(id).populate({
            path: 'idEmploye',
            select: '_id nom prenom',
        }).populate('idService');;
        return result;
    } catch (error) {
        throw error;
    }
}

const update = async (id, data) => {
    try {
        const update = {
            $set: data
        };
        const options = { new: true };

        let updatedObject = await RdvDetail.findByIdAndUpdate(id, update, options)
        return updatedObject;
    } catch (error) {
        throw error;
    }
}

const deleteById = async (id) => {
    try {
        await RdvDetail.findByIdAndRemove(id)
    } catch (error) {
        throw error;
    }
}


const findByIntervale = async (heureDebut, heureFin) => {
    try {

        let query = {};

        if (heureDebut) {
            query.debutService = { $lte: heureDebut };
        }
        if (heureFin) {
            query.finService = { $gte: heureFin };
        }

        let list = await RdvDetail.find(query).populate({
            path: 'idEmploye',
            select: '_id nom prenom',
        }).populate('idService').sort({ heure: 1 });
        return list;
    } catch (error) {
        throw error;
    }
}



const findAvailableUsers = async (heureDebut, heureFin) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        // Trouver les employés indisponibles
        const indisponibles = await findByIntervale(heureDebut, heureFin);
        const indisponiblesIds = indisponibles.map(detail => detail.idEmploye.toString());

        // Vérifier la disponibilité basée sur une autre logique spécifique
        const potentiellementDispos = await horaireService.checkHoraireDispoUser(null, heureDebut, heureFin);
        const disposIds = potentiellementDispos.filter(detail => !indisponiblesIds.includes(detail.idEmploye.toString())).map(detail => detail.idEmploye);

        // Utiliser les IDs pour trouver les utilisateurs correspondants
        const utilisateursDispos = await Utilisateur.find({
            '_id': { $in: disposIds }
        }).session(session);

        await session.commitTransaction();
        return utilisateursDispos;
    } catch (error) {
        await session.abortTransaction();
        throw error;
    } finally {
        session.endSession();
    }
};

const historiqueRdvUsers = async (idUser,page,limit) => {
    try{
        if(!page){
            page = 1;
        }else{
            page = parseInt(page);
        }
        if(!limit){
            limit = 10;
        }else{
            limit = parseInt(limit);
        }
        const skipIndex = (page - 1) * limit;
        const historique = await RdvDetail.aggregate([
            {
                // Effectuez une jointure avec la collection 'rdv' pour obtenir les informations sur le rendez-vous
                $lookup: {
                    from: "rdvs",
                    localField: "idRdv",
                    foreignField: '_id',
                    as: "rdvDetails"
                }
            },
            // Déroulez le tableau 'rdvDetails' pour obtenir les détails de rendez-vous
            { $unwind: '$rdvDetails' },
            // Filtrez les rendez-vous pour l'utilisateur donné
            { $match: { "rdvDetails.idUser": new mongoose.Types.ObjectId(idUser)} },
            {
                $lookup: {
                    from: 'services',
                    localField: 'idService',
                    foreignField: '_id',
                    as: 'serviceDetails'
                }
            },
            // Déroulez le tableau 'serviceDetails' pour obtenir les détails du service
            { $unwind: '$serviceDetails' },
            {
                $lookup: {
                    from: 'utilisateurs',
                    localField: 'idEmploye',
                    foreignField: '_id',
                    as: 'employeDetails'
                }
            },
            // Déroulez le tableau 'serviceDetails' pour obtenir les détails du service
            { $unwind: '$employeDetails' },
            {
                $project: {
                    _id: 1,
                    dateRdv: "$rdvDetails.dateRdv" ,
                    debutService: 1,
                    finService: 1,
                    statusService: 1,
                    idUser: "$rdvDetails.idUser",
                    service: {
                        id: '$serviceDetails._id',
                        nom: '$serviceDetails.nom',
                        delai: '$serviceDetails.delai',
                        prix: '$serviceDetails.prix',
                    },
                    employe: { 
                        id: "$employeDetails._id",
                        nom: "$employeDetails.nom", 
                        prenom:"$employeDetails.prenom"
                    },
                }
            },
            // Pagination
            { $skip: skipIndex }, // sauter les premiers résultats
            { $limit: limit } // limiter le nombre de résultats retournés
        ]);
        return historique;
    }catch (error) {
        throw error;
    } finally {
        
    }
}



module.exports = {
    create,
    createDetail,
    find,
    findById,
    update,
    deleteById,
    findByIntervale,
    findAvailableUsers,
    historiqueRdvUsers
}