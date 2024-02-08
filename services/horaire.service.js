const Horaire = require('../models/HoraireTravail');


const create = async (data) => {
    try {
        let rdv = new Horaire(data);
        const newObject = await rdv.save();
        return newObject;
    } catch (error) {
        throw error;
    }
}

const find = async () => {
    try {
        let list = await Horaire.find().populate({
            path: 'idEmploye',
            select: '_id nom prenom',
        });
        return list;
    } catch (error) {
        throw error;
    }
}

const findById = async (id) => {
    try {
        let result = await Horaire.findById(id).populate({
            path: 'idEmploye',
            select: '_id nom prenom',
        });
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

        let updatedObject = await Horaire.findByIdAndUpdate(id, update, options)
        return updatedObject;
    } catch (error) {
        throw error;
    }
}

const deleteById = async (id) => {
    try {
        await Horaire.findByIdAndRemove(id)
    } catch (error) {
        throw error;
    }
}


const checkHoraire = async (idUser, heureClient) => {
    try {

        let query = {};

        if (heureClient) {
            query.heureDebut = { $lte: heureClient };
            query.heureFin = { $gte: heureClient };
            // query.pauseDebut = { $gt: heureClient };
            // query.pauseFin = { $lte: heureClient };
            query.$and = [
                {
                    $or: [
                        { $and: [ // Les documents où heureClient n'est pas pendant la pause
                            { pauseDebut: { $exists: true, $not: { $lte: heureClient } } },
                            { pauseFin: { $exists: true, $not: { $gte: heureClient } } }
                        ] },
                        { $or: [ // Les documents sans pause définie
                            { pauseDebut: { $exists: false } },
                            { pauseFin: { $exists: false } }
                        ]}
                    ]
                }
            ] ;
        }

        if (idUser) {
            query.idUser = idUser;
        }

        let list = await Horaire.find(query).populate({
            path: 'idEmploye',
            select: '_id nom prenom',
        }).sort({ heure: 1 });
        return list;
    } catch (error) {
        throw error;
    }
}


module.exports = {
    create,
    find,
    findById,
    update,
    deleteById,
    checkHoraire
}