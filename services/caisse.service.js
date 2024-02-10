const Caisse = require('../models/Caisse');


const addRevenu = async (data) => {
    try {
        let obj = new Caisse(data);
        const newObject = await obj.save();
        return newObject;
    } catch (error) {
        throw error;
    }
}

const addDepense = async (data) => {
    try {
        let obj = new Caisse(data);
        const newObject = await obj.save();
        return newObject;
    } catch (error) {
        throw error;
    }
}


const findIntervale = async () => {
    try {

        //Filtre
        let query = {};
        query.dateRdv = { ...query.dateRdv, $gte: new Date(dateDebut) };

        if (dateDebut) {

        }
        if (dateFin) {
            const dateFinInclusive = new Date(dateFin);
            dateFinInclusive.setDate(dateFinInclusive.getDate() + 1);
            dateFinInclusive.setMilliseconds(-1); // Recule d'un milliseconde pour finir à 23:59:59.999
            query.dateRdv = { ...query.dateRdv, $lte: dateFinInclusive };
        }

        const list = await Caisse.find(query);
        return list;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    addRevenu,
    addDepense,
    findIntervale
}