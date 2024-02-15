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



module.exports = {
    create,
    createDetail,
    find,
    findById,
    update,
    deleteById,
    findByIntervale,
    findAvailableUsers
}