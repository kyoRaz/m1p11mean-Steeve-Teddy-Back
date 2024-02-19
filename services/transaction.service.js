const Transaction = require('../models/TypeTransaction');


const create = async (data) => {
    try {
        let transaction = new Transaction({ libelle: data });
        const newObject = await transaction.save();
        return newObject;
    } catch (error) {
        throw error;
    }
}

const find = async () => {
    try {
        let list = await Transaction.find();
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

        let updatedObject = await Transaction.findByIdAndUpdate(id, update, options)
        return updatedObject;
    } catch (error) {
        throw error;
    }
}

const deleteById = async (id) => {
    try {
        await Transaction.findByIdAndRemove(id)
    } catch (error) {
        throw error;
    }
}


module.exports = {
    create,
    find,
    update,
    deleteById
}