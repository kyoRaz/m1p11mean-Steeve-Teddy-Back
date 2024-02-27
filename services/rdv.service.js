const Rdv = require('../models/Rdv');
const RdvDetail = require('../models/RdvDetail');
const { startSession } = require('mongoose');
const rdvDetailService = require('./rdvDetail.service');

const create = async (data) => {
    try {
        let rdv = new Rdv(data);
        const newObject = await rdv.save();
        return newObject;
    } catch (error) {
        throw error;
    }
}

const createWithTransaction = async (data, session) => {
    try {
        let rdv = new Rdv(data);
        const newObject = await rdv.save({ session });
        return newObject;
    } catch (error) {
        throw error;
    }
}

const find = async (filtre, pagination) => {
    try {
        let { dateDebut, dateFin, idUser } = filtre;
        let { orderBy, page, limit } = pagination;

        //Filtre
        let query = {};

        if (dateDebut) {
            query.dateRdv = { ...query.dateRdv, $gte: new Date(dateDebut) };
        }
        if (dateFin) {
            const dateFinInclusive = new Date(dateFin);
            dateFinInclusive.setDate(dateFinInclusive.getDate() + 1);
            dateFinInclusive.setMilliseconds(-1); // Recule d'un milliseconde pour finir à 23:59:59.999
            query.dateRdv = { ...query.dateRdv, $lte: dateFinInclusive };
        }
        if (idUser) {
            query.idUser = idUser;
        }

        query.estActif = true;

        const sort = {};
        if (orderBy) {
            const [field, order] = orderBy.split(':'); // Split de "fieldName:order" en tableau
            sort[field] = order === 'desc' ? -1 : 1; // -1 pour décroissant, 1 pour croissant
        }

        //Pagination 
        const skip = (page - 1) * limit;
        const totalDocuments = await Rdv.countDocuments(query);
        const totalPages = Math.ceil(totalDocuments / parseInt(limit));

        const list = await Rdv.find(query).populate({
            path: 'idUser',
            select: '_id nom prenom',
        })
            .sort(sort)
            .skip(skip)
            .limit(parseInt(limit))
            .exec();

        return {
            total: totalDocuments,
            totalPages: totalPages,
            page: parseInt(page),
            limit: parseInt(limit),
            result: list,
        };
    } catch (error) {
        throw error;
    }
}

// const find = async () => {
//     try {
//         let list = await Rdv.find().populate({
//             path: 'idUser',
//             select: '_id nom prenom',
//         });
//         return list;
//     } catch (error) {
//         throw error;
//     }
// }

const findById = async (id) => {
    try {
        let list = await Rdv.findById(id).populate({
            path: 'idUser',
            select: '_id nom prenom',
        })
        return list;
    } catch (error) {
        throw error;
    }
}

const findDetails = async (idRdv) => {
    try {
        let list = await RdvDetail.find({idRdv})
            .populate({
                path: 'idService',
                select: '_id nom prix delai',
            })
            .populate({
                path: "idEmploye",
                select: "_id nom prenom"
            });
        return list;
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

        let updatedObject = await Rdv.findByIdAndUpdate(id, update, options)
        return updatedObject;
    } catch (error) {
        throw error;
    }
}

const deleteById = async (id) => {
    try {
        await Rdv.findByIdAndRemove(id)
    } catch (error) {
        throw error;
    }
}


const createRdvandDetail = async (data, listDetails) => {
    const session = await startSession();
    session.startTransaction();
    try {
        let rdv = await createWithTransaction(data, session);

        let listIdService = [];
        for (let detail of listDetails) {
            if (listIdService.includes(detail.idService)) {
                throw new Error('idService already exists in the listIdService');
            }
            await rdvDetailService.createDetail(rdv._id, detail, session);
            listIdService.push(detail.idService);
        }
        await session.commitTransaction();
    } catch (error) {
        await session.abortTransaction();
        throw error;
    } finally {
        session.endSession();
    }
}

const getRDVProche = async () => {
    try {
        const today = new Date();
        const tomorrow = new Date(today); // Copie l'objet Date d'aujourd'hui pour éviter de modifier l'original
        tomorrow.setDate(tomorrow.getDate() + 1);
        const tomorrowString = tomorrow.toISOString().split('T')[0];
        let list = await Rdv.find({
            dateRdv: tomorrowString,
            estActif: true
        }).populate({
            path: 'idUser',
            select: '_id nom prenom email',
        });
        return list;
    } catch (error) {
        throw error;
    }
}
const historiqueRdv = async (idUser,page,limit,dateDebut,dateFin) => {
    try {
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
        let filtre = {idUser};

        // Vérifier si dateDebut existe et est valide
        if (dateDebut) {
            const dateDebutObj = new Date(dateDebut);
            if (!isNaN(dateDebutObj.getTime())) { // Vérifie si la dateDebut est valide
                filtre.dateRdv = { $gte: dateDebutObj };
            }
        }

        // Vérifier si dateFin existe et est valide
        if (dateFin) {
            const dateFinObj = new Date(dateFin);
            if (!isNaN(dateFinObj.getTime())) { // Vérifie si la dateFin est valide
                if (filtre.dateRdv) { // Si dateDebut a déjà été spécifié
                    filtre.dateRdv.$lte = dateFinObj;
                } else { // Si dateDebut n'a pas été spécifié
                    filtre.dateRdv = { $lte: dateFinObj };
                }
            }
        }
        const skipIndex = (page - 1) * limit;
        let list = await Rdv.find(filtre)
        .sort({ dateRdv: -1 })
        .skip(skipIndex) // Ignorer les documents des pages précédentes
        .limit(limit);
        return list;
    } catch (error) {
        throw error;
    }
}

const payerRdv = async (idRdv) => {
    try {
        
    } catch (error) {
        throw error;
    }
}


module.exports = {
    create,
    createWithTransaction,
    find,
    findById,
    update,
    deleteById,
    createRdvandDetail,
    getRDVProche,
    historiqueRdv,
    findDetails,
    payerRdv
}