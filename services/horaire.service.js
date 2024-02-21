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

const findByIdEmp = async (id) => {
    try {
        let result = await Horaire.findOne({ idEmploye: id });
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


            query =
            {
                $or: [
                    {
                        $and: [
                            {
                                heureDebut: { $exists: true, $lte: heureClient }
                            },
                            { pauseDebut: { $exists: true, $gt: heureClient } },
                        ]
                    },
                    {
                        $and: [
                            { pauseFin: { $exists: true, $lte: heureClient } },
                            { heureFin: { $exists: true, $gt: heureClient } },
                        ]
                    }
                ]
            }

        }

        if (idUser) {
            query.idEmploye = idUser;
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

const checkHoraireDispoUserWithNoService = async (idUser, debutServiceTarget, finServiceTarget, date) => {
    try {
        let list = []
        list = await Horaire.aggregate([
            {
                $match: {
                    $or: [
                        {
                            $and: [
                                {
                                    heureDebut: { $exists: true, $lte: debutServiceTarget }
                                },
                                { pauseDebut: { $exists: true, $gte: finServiceTarget } },
                            ]
                        },
                        {
                            $and: [
                                { pauseFin: { $exists: true, $lte: debutServiceTarget } },
                                { heureFin: { $exists: true, $gte: finServiceTarget } },
                            ]
                        }
                    ]
                }
            },
            {
                $lookup: {
                    from: "rdvdetails",
                    localField: "idEmploye",
                    foreignField: "idEmploye",
                    as: "rdvdetails"
                }
            },
            {
                $lookup: {
                    from: "rdvs",
                    localField: "rdvdetails.idRdv",
                    foreignField: "rdvs._id",
                    as: "rdvs"
                }
            },
            //Filtrer les rendez-vous qui ont la date donnée
            {
                $match: {
                    "rdvs.dateRdv": new Date(date)
                }
            },
            {
                $match: {
                    rdvdetails: {
                        $not: {
                            $elemMatch: {
                                debutService: { $lt: finServiceTarget },
                                finService: { $gt: debutServiceTarget }
                            }
                        }
                    }
                }
            },
            {
                $lookup: {
                    from: "utilisateurs",
                    localField: "idEmploye",
                    foreignField: "_id",
                    as: "employee"
                }
            },
            {
                $unwind: "$employee"
            },
            {
                $project: {
                    _id: 0,
                    idEmploye: {
                        _id: "$employee._id",
                        nom: "$employee.nom",
                        prenom: "$employee.prenom",
                    },
                    heureDebut: 1,
                    heureFin: 1,
                    pauseDebut: 1,
                    pauseFin: 1
                }
            }
        ]).exec();
        return list;
    } catch (error) {
        throw error;
    }
}


const checkHoraireDispoUser = async (idUser, debutService, finService) => {
    try {

        let query = {};

        query.$and = [

            {
                $or: [
                    {
                        $and: [
                            {
                                heureDebut: { $exists: true, $lte: debutService }
                            },
                            { pauseDebut: { $exists: true, $gt: debutService } },
                        ]
                    },
                    {
                        $and: [
                            { pauseFin: { $exists: true, $lte: debutService } },
                            { heureFin: { $exists: true, $gt: debutService } },
                        ]
                    }
                ]
            },
            {
                $or: [
                    {
                        $and: [
                            {
                                heureDebut: { $exists: true, $lte: finService }
                            },
                            { pauseDebut: { $exists: true, $gt: finService } },
                        ]
                    },
                    {
                        $and: [
                            { pauseFin: { $exists: true, $lte: finService } },
                            { heureFin: { $exists: true, $gt: finService } },
                        ]
                    }
                ]
            }

        ]

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
    checkHoraire,
    checkHoraireDispoUser,
    checkHoraireDispoUserWithNoService,
    findByIdEmp
}