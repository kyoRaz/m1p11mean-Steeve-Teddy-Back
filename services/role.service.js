const Role = require('../models/Role');


const create = async (data) => {
    try {
        let role = new Role({ libelle: data });
        const newObject = await role.save();
        return newObject;
    } catch (error) {
        throw error;
    }
}

const find = async () => {
    try {
        let list = await Role.find();
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

        let updatedObject = await Role.findByIdAndUpdate(id, update, options)
        return updatedObject;
    } catch (error) {
        throw error;
    }
}

const deleteById = async (id) => {
    try {
        await Role.findByIdAndRemove(id)
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