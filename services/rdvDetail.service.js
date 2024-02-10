const RdvDetail = require('../models/RdvDetail');


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
            query.heure = { ...query.heure, $gte: heureDebut };
        }
        if (heureFin) {
            query.heure = { ...query.heure, $lte: heureFin };
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


module.exports = {
    create,
    createDetail,
    find,
    findById,
    update,
    deleteById,
    findByIntervale
}