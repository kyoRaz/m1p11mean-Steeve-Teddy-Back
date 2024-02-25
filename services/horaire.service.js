const { completeTimeFormat } = require('../helpers/outil');
const HoraireTravail = require('../models/HoraireTravail');
const Horaire = require('../models/HoraireTravail');
const Rdv = require('../models/Rdv');
const RdvDetail = require('../models/RdvDetail');


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
        
        debutServiceTarget = completeTimeFormat(debutServiceTarget);
        finServiceTarget = completeTimeFormat(finServiceTarget);
        const employees = await HoraireTravail.find({
            $or: [
                {
                    $and: [
                        {
                            heureDebut: { $exists: true, $lte: debutServiceTarget }
                        },
                        {   pauseDebut: { $exists: true, $gte: finServiceTarget } 
                        },
                    ]
                },
                {
                    $and: [
                        { pauseFin: { $exists: true, $lte: debutServiceTarget } },
                        { heureFin: { $exists: true, $gte: finServiceTarget } },
                    ]
                }
            ]
        }).populate({
            path:"idEmploye",
            select: "_id nom prenom",
            match: { removed: false }
        });
        console.log('employees');
        console.log(employees);

        const occupiedEmployees = await RdvDetail.find({
            debutService: { $lt: finServiceTarget },
            finService: { $gt: debutServiceTarget },
            idRdv: {
                $in: await Rdv.find({
                    dateRdv: date ? new Date(date) : new Date()
                }).distinct('_id')
            }
        }).populate({
            path:"idEmploye",
            select: "_id nom prenom",
            match: { removed: false }
        });

        console.log("occupiedEmployees");
        console.log(occupiedEmployees)
        

        const occupiedEmployeeIds = occupiedEmployees.filter(emp => emp.idEmploye).map(emp =>  emp.idEmploye._id.toString());
        // Filtrer les employés disponibles en fonction des employés occupés
        const availableEmployees = employees.filter(emp => emp.idEmploye).filter(emp => !occupiedEmployeeIds.includes(emp.idEmploye._id.toString()));

        return availableEmployees;
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