const Preference = require('../models/Preference');


const create = async (data) => {
    try {
        let srv = new Preference(data);
        const newObject = await srv.save();
        return newObject;
    } catch (error) {
        throw error;
    }
}

const find = async () => {
    try {
        let list = await Preference.find().populate({
            path: 'idEmpFav',
            select: '_id nom prenom',
        }).populate('idService')
        return list;
    } catch (error) {
        throw error;
    }
}

const findOne = async (data) => {
    try {
        let list = await Preference.findOne(data).populate({
            path: 'idEmpFav',
            select: '_id nom prenom',
        }).populate('idService');
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

        let updatedObject = await Preference.findByIdAndUpdate(id, update, options)
        return updatedObject;
    } catch (error) {
        throw error;
    }
}

const deleteById = async (id) => {
    try {
        await Preference.findByIdAndRemove(id)
    } catch (error) {
        throw error;
    }
}


module.exports = {
    create,
    find,
    findOne,
    update,
    deleteById
}