const DeviceToken = require("../models/DeviceToken")

const getAllToken = async ()=>{
    try {
        let data = await DeviceToken.find();
        return data
    } catch (error) {
        throw error
    }
}

const updateDeviceToken = async (token)=>{
    try {
        const data = {
            token: token
        }
        const query = {}; 
        const update = { $set: data }; 
        const options = {
            upsert: true,
            new: true,
        };

        await DeviceToken.findOneAndUpdate(query, update, options)
    } catch (error) {
        throw error
    }
}

module.exports = {
    updateDeviceToken,
    getAllToken
}