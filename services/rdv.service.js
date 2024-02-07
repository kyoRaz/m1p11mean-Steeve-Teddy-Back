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

const find = async () => {
    try {
        let list = await Rdv.find();
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