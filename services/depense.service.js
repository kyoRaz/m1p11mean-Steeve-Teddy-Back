const Depense = require('../models/Depense');
const Caisse = require('../models/Caisse');


const create = async (data) => {
    try {
        const { montant, description } = data
        let depense = new Depense(data);
        const newObject = await depense.save();
        let caisse = new Caisse({ sortie: montant, entree: 0, description: description });
        await caisse.save();
        return newObject;
    } catch (error) {
        throw error;
    }
}

const find = async () => {
    try {
        let list = await Depense.find().populate({
            path: 'idTypeDepense',
            select: '_id libelle',
        });
        return list;
    } catch (error) {
        throw error;
    }
}

const findFiltre = async (startDate, endDate, page = 1, pageSize = 10) => {
    try {
        let queryCriteria = {};

        if (startDate || endDate) {
            queryCriteria.date = {};
            if (startDate) {

                queryCriteria.date.$gte = new Date(startDate + 'T00:00:00.000Z');
            }
            if (endDate) {
                queryCriteria.date.$lte = new Date(endDate + 'T23:59:59.999Z');
            }
        }

        const startIndex = (page - 1) * pageSize;


        let result = await Depense.find(queryCriteria)
            .populate({
                path: 'idTypeDepense',
                select: '_id libelle',
            }).
            sort({ date: -1 })
            .skip(startIndex)
            .limit(pageSize);

        const totalCount = await Depense.countDocuments(queryCriteria);

        return {
            totalPages: Math.ceil(totalCount / pageSize),
            currentPage: page,
            pageSize: pageSize,
            total: totalCount,
            data: result
        };
    } catch (error) {
        throw error;
    }
}

const findById = async (id) => {
    try {
        let list = await Depense.findById(id).populate({
            path: 'idTypeDepense',
            select: '_id libelle',
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

        let updatedObject = await Depense.findByIdAndUpdate(id, update, options)
        return updatedObject;
    } catch (error) {
        throw error;
    }
}

const deleteById = async (id) => {
    try {
        let depenseToDelete = await Depense.findById(id);
        let { montant } = depenseToDelete;
        let caisse = new Caisse({ sortie: 0, entree: montant, description: `Suppression de dépense ${id}` });
        await caisse.save();
        await Depense.findByIdAndRemove(id);
    } catch (error) {
        throw error;
    }
}


module.exports = {
    create,
    find,
    update,
    deleteById,
    findById,
    findFiltre
}