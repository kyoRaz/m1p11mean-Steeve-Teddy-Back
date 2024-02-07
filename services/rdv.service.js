const Rdv = require('../models/Rdv');


const create = async (data) => {
    try {
        let rdv = new Rdv(data);
        const newObject = await rdv.save();
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

const findById = async (id) => {
    try {
        let result = await Rdv.findById(id).populate(({
            path: 'idUser',
            select: '_id nom prenom',
        }));
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


module.exports = {
    create,
    find,
    findById,
    update,
    deleteById
}