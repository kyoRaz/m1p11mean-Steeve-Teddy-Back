const ModePaiement = require('../models/ModePaiement');


const create = async (data) => {
    try {
        let modePaiement = new ModePaiement({ libelle: data });
        const newObject = await modePaiement.save();
        return newObject;
    } catch (error) {
        throw error;
    }
}

const find = async () => {
    try {
        let list = await ModePaiement.find();
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

        let updatedObject = await ModePaiement.findByIdAndUpdate(id, update, options)
        return updatedObject;
    } catch (error) {
        throw error;
    }
}

const deleteById = async (id) => {
    try {
        await ModePaiement.findByIdAndRemove(id)
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