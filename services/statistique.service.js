const mongoose = require("mongoose");
const Rdv = require("../models/Rdv");
const Caisse = require("../models/Caisse");
const Utilisateur = require("../models/Utilisateur");
const RdvDetail = require("../models/RdvDetail");
const { completeTimeFormat, formatterDate } = require("../helpers/outil");

const Paiement = require("../models/Paiement");

const nombreReservationParJour = async (startDate, endDate, estActif = true) => { 
    try {
        let query = {};

        if (!startDate) {
            const currentDate = new Date();
            startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1,0,0,0,0);
        }else{
            startDate = new Date(startDate);
        }

        
        if (!endDate) {
            const currentDate = new Date();
            endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1); 
        }else{
            endDate = new Date(endDate);
        }

        query.dateRdv = { $gte: startDate, $lte: endDate };
        query.estActif = estActif
        const reservationsCount = await Rdv.aggregate([
            {
                $match: query
            },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$dateRdv" } },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { "_id": 1 } 
            }
        ]);


        const data = {
            labels: [],
            data: []
        };

        const allDates = getDaysBetweenDates(startDate,endDate);
        allDates.map(date => {
            const dateString = date.toISOString().split('T')[0];
            const reservation = reservationsCount.find(entry => entry._id === dateString);
            data.labels.push(dateString),
            data.data.push(reservation?.count ? reservation.count : 0)
        });

        return data;
    } catch (error) {
        throw error;
    }
}

const nombreReservationParMois = async (year,estActif = true) => {
    try {
        if (!year) {
            const currentDate = new Date();
            year = currentDate.getFullYear();
        }

        const months = [];
        for (let month = 0; month < 12; month++) {
            months.push(new Date(year, month, 1));
        }

        
        const reservationsCount = await Rdv.aggregate([
            {
                $match: {
                    dateRdv: { $gte: new Date(year, 0, 1), $lte: new Date(year, 11, 31) },
                    estActif: estActif
                }
            },
            {
                $group: {
                    _id: {
                        year: { $year: "$dateRdv" },
                        month: { $month: "$dateRdv" }
                    },
                    count: { $sum: 1 }
                }
            }
        ]);

        const data = {
            labels: [],
            data: []
        };
        months.map(monthDate => {
            const month = monthDate.getMonth() + 1; // Ajouter 1 car les mois sont à base zéro
            const year = monthDate.getFullYear();
            const monthName = monthDate.toLocaleDateString('fr-FR', { month: 'long' }); // Nom du mois en français
            const reservation = reservationsCount.find(entry => entry._id.month === month && entry._id.year === year);
            const count = reservation ? reservation.count : 0;
            data.labels.push(monthName);
            data.data.push(count);
        });

        return data;

    } catch (error) {
        throw error;
    }
}


const beneficeParMoisIncluantDepense = async (year) => {
    try{
        if (!year) {
            const currentDate = new Date();
            year = currentDate.getFullYear();
        }
        const dateDebut = new Date(year, 0, 1);
        const dateFin = new Date(year, 11, 31);
    
        const profits = await Caisse.aggregate([
            {
                $match: {
                    date: { $gte: dateDebut, $lte: dateFin }
                }
            },
            {
                $group: {
                    _id: { month: { $month: "$date" }, year: { $year: "$date" } },
                    totalEntree: { $sum: "$entree" },
                    totalSortie: { $sum: "$sortie" }
                }
            },
            {
                $project: {
                    _id: 0,
                    month: "$_id.month",
                    year: "$_id.year",
                    totalEntree: "$totalEntree", 
                    totalSortie: "$totalSortie", 
                    benefice: { $subtract: ["$totalEntree", "$totalSortie"] }
                }
            }
        ]);
    
        const months = [];
        for (let month = 0; month < 12; month++) {
            months.push(new Date(year, month, 1));
        }
    
        const formattedData = months.map(monthDate => {
            const month = monthDate.getMonth() + 1; // Ajouter 1 car les mois sont à base zéro
            const year = monthDate.getFullYear();
            const monthName = monthDate.toLocaleDateString('fr-FR', { month: 'long' }); // Nom du mois en français
            const profitEntry = profits.find(entry => entry.year === year && entry.month === month);
            const benefice = profitEntry ? profitEntry.benefice : 0;
            const totalEntree = profitEntry ? profitEntry.totalEntree : 0;
            const totalSortie = profitEntry ? profitEntry.totalSortie : 0;
            return { year, month, monthName, benefice, totalEntree, totalSortie };
        });
    
    
        return formattedData;
    }catch(error){
        throw error;
    }
    
}


const tempsTravailMoyenParEmploye = async (dateDebut, dateFin) => {
    try{
        
        // const dateCourante = new Date();
        // dateCourante.setHours(0, 0, 0, 0); 
        // const jourCourant = dateCourante.getDay(); // Obtenez le jour de la semaine actuel (0 pour dimanche, 1 pour lundi, ..., 6 pour samedi)

        // // Pour obtenir le début de la semaine courante (lundi précédent)
        // const debutSemaineCourante = new Date(dateCourante);
        // debutSemaineCourante.setDate(debutSemaineCourante.getDate() - ((jourCourant + 6) % 7 - 1)); // Soustrayez le nombre de jours pour atteindre le lundi
        // debutSemaineCourante.setHours(0, 0, 0, 0); // Définissez l'heure à 00:00:00

        // // Pour obtenir la fin de la semaine courante (dimanche suivant)
        // const finSemaineCourante = new Date(debutSemaineCourante);
        // finSemaineCourante.setDate(finSemaineCourante.getDate() + 6); // Ajoutez 6 jours pour atteindre le dimanche
        // finSemaineCourante.setHours(0, 0, 0, 0); 

        // const date1 = dateDebut || debutSemaineCourante;
        // const date2 = dateFin || finSemaineCourante;
        
        // const tempsTravails = await RdvDetail.aggregate([
        //     {
        //         $lookup: {
        //             from: "rdvs",
        //             localField: "idRdv",
        //             foreignField: "_id",
        //             as: "rdv_info"
        //         }
        //     },
        //     {
        //         $unwind: "$rdv_info"
        //     },
        //     {
        //         $match: {
        //             $and: [
        //                 { "rdv_info.dateRdv": { $gte: date1 } },
        //                 { "rdv_info.dateRdv": { $lte: date2 } }
        //             ]
        //         }
        //     },
        //     {
        //         $lookup: {
        //             from: "utilisateurs",
        //             localField: "idEmploye",
        //             foreignField: "_id",
        //             as: "employes"
        //         }
        //     },
        //     {
        //         $unwind: "$employes"
        //     },
        //     {
        //         $group: {
        //             _id: "$idEmploye",
        //             nom: { $first: "$employes.nom" }, // Prendre le nom de l'employé (le même pour tous les rendez-vous groupés)
        //             prenom: { $first: "$employes.prenom" },
        //             totalServiceTime: {
        //                 $sum: {
        //                     $subtract: [
        //                         {
        //                             $add: [
        //                                 { $multiply: [{ $toInt: { $substrCP: ["$finService", 0, 2] } }, 60] }, // Heures en minutes
        //                                 { $toInt: { $substrCP: ["$finService", 3, 2] } } // Minutes
        //                             ]
        //                         },
        //                         {
        //                             $add: [
        //                                 { $multiply: [{ $toInt: { $substrCP: ["$debutService", 0, 2] } }, 60] }, // Heures en minutes
        //                                 { $toInt: { $substrCP: ["$debutService", 3, 2] } } // Minutes
        //                             ]
        //                         }
        //                     ]
        //                 } 
        //             },
        //             count: { $sum: 1 } // Nombre total de rendez-vous par employé (peut être utile pour la moyenne)
        //         }
        //     },
            
        //     {
        //         $project: {
        //             _id: 0,
        //             idEmploye: "$_id",
        //             nomEmploye: "$nom",
        //             prenomEmploye: "$prenom",
        //             avgServiceTime: { $divide: ["$totalServiceTime", "$count"] } // Calculer la moyenne
        //         }
        //     }
        // ]);
        // // Obtenez la liste complète des employés depuis la collection 'utilisateurs'
        // const employes = await Utilisateur.find({roleId: process.env.ROLE_EMPLOYE}, { _id: 1, nom: 1, prenom: 1 });
        // const data = {
        //     labels: [],
        //     data: {
        //         tempsTravailMinute: [],
        //         tempsTravailHeure: []
        //     }
        // };
        
        // employes.map(employe => {
        //     const tempsTravail = tempsTravails.find(entry => entry.idEmploye.toString() === employe._id.toString());
            
        //     data.labels.push(employe.nom+" "+employe.prenom);
        //     data.data.tempsTravailMinute.push(tempsTravail?.avgServiceTime ? tempsTravail?.avgServiceTime : 0);
        //     data.data.tempsTravailHeure.push(tempsTravail?.avgServiceTime ? tempsTravail?.avgServiceTime/60 : 0);
            
        // });

        const employes = await Utilisateur.find({roleId: process.env.ROLE_EMPLOYE}, { _id: 1, nom: 1, prenom: 1 });

        const data = {
            labels: [],
            data: []
        };
        
        
        for (let employe of employes){
            const result = await tempsTravailMoyenDUnEmploye(dateDebut,dateFin,employe?._id?.toString());
            data.labels = result?.labels;
            data.data.push({
                name: employe.nom+" "+employe.prenom,
                data: result?.data?.tempsTravailHeure
            })
        };
        return data;
    }catch(error){
        throw error;
    }
}

const chiffreDAffaireParJour = async (startDate, endDate) => { 
    try {
        let query = {etat: 11};

        if (!startDate) {
            const currentDate = new Date();
            startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1,0,0,0,0);
        }else{
            startDate = new Date(startDate);
        }

        
        if (!endDate) {
            const currentDate = new Date();
            endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1); 
        }else{
            endDate = new Date(endDate);
        }

        query.date = { $gte: startDate, $lte: endDate };
        const chiffreAffaireCount = await Paiement.aggregate([
            {
                $match: query
            },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
                    chiffreAffaire: { $sum: "$montant" }
                }
            },
            {
                $sort: { "_id": 1 } 
            }
        ]);
        console.log("chiffreAffaireCount")
        console.log(chiffreAffaireCount)

        const allDates = [];
        let currentDate = new Date(startDate);
        while (currentDate <= endDate) {
            allDates.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
        }

        const data = {
            labels: [],
            data: []
        };

        allDates.map(date => {
            const dateString = date.toISOString().split('T')[0];
            const chiffreAffaire = chiffreAffaireCount.find(entry => entry._id === dateString);
            
            data.labels.push(dateString);
            data.data.push(chiffreAffaire?.chiffreAffaire ? chiffreAffaire.chiffreAffaire : 0);
            
        });

        return data;
    } catch (error) {
        throw error;
    }
}

const chiffreDAffaireParMois = async (year) => { 
    try{
        if (!year) {
            const currentDate = new Date();
            year = currentDate.getFullYear();
        }
        const dateDebut = new Date(year, 0, 1);
        const dateFin = new Date(year, 11, 31);

        const chiffreAffaires = await Paiement.aggregate([
            {
                $match: {
                    date: { $gte: dateDebut, $lte: dateFin },
                    etat: 11
                }
            },
            {
                $group: {
                    _id: { month: { $month: "$date" }, year: { $year: "$date" } },
                    chiffreAffaire: { $sum: "$montant" }
                }
            },
            {
                $project: {
                    _id: 0,
                    month: "$_id.month",
                    year: "$_id.year",
                    chiffreAffaire: "$chiffreAffaire"
                }
            }
        ]);

        
        
        const months = [];
        for (let month = 0; month < 12; month++) {
            months.push(new Date(year, month, 1));
        }

        const data = {
            labels: [],
            data: []
        };

        months.map(monthDate => {
            const month = monthDate.getMonth() + 1; // Ajouter 1 car les mois sont à base zéro
            const year = monthDate.getFullYear();
            const monthName = monthDate.toLocaleDateString('fr-FR', { month: 'long' }); // Nom du mois en français
            const chiffreAffaireEntry = chiffreAffaires.find(entry => entry.year === year && entry.month === month);
            const chiffreAffaire = chiffreAffaireEntry ? chiffreAffaireEntry.chiffreAffaire : 0;
            data.labels.push(monthName);
            data.data.push(chiffreAffaire);
        });


        return data;
    }catch(error){
        throw error;
    }
}


const getDaysBetweenDates = (startDate, endDate) => {
    const days = [];
    const dateString = startDate.toISOString().split('T')[0];
    const currentDate = new Date(dateString);
    

    while (currentDate <= endDate) {
        days.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return days;
};

const tempsTravailMoyenDUnEmploye = async (dateDebut, dateFin,idEmploye) => {
    try{
        
        const dateCourante = new Date();
        dateCourante.setHours(0, 0, 0, 0); 
        const jourCourant = dateCourante.getDay(); // Obtenez le jour de la semaine actuel (0 pour dimanche, 1 pour lundi, ..., 6 pour samedi)

        // Pour obtenir le début de la semaine courante (lundi précédent)
        const debutSemaineCourante = new Date(dateCourante);
        debutSemaineCourante.setDate(debutSemaineCourante.getDate() - ((jourCourant + 6) % 7 - 1)); // Soustrayez le nombre de jours pour atteindre le lundi
        debutSemaineCourante.setHours(0, 0, 0, 0); // Définissez l'heure à 00:00:00

        // Pour obtenir la fin de la semaine courante (dimanche suivant)
        const finSemaineCourante = new Date(debutSemaineCourante);
        finSemaineCourante.setDate(finSemaineCourante.getDate() + 6); // Ajoutez 6 jours pour atteindre le dimanche
        finSemaineCourante.setHours(0, 0, 0, 0); 

        const date1 = dateDebut || debutSemaineCourante;
        const date2 = dateFin || finSemaineCourante;
        
        const tempsTravails = await RdvDetail.aggregate([
            {
                $lookup: {
                    from: "rdvs",
                    localField: "idRdv",
                    foreignField: "_id",
                    as: "rdv_info"
                }
            },
            {
                $unwind: "$rdv_info"
            },
            {
                $match: {
                    $and: [
                        { "rdv_info.dateRdv": { $gte: date1, $lte: date2 } }, // Filtrer par plage de dates
                        { "idEmploye": new mongoose.Types.ObjectId(idEmploye) } // Filtrer par employé spécifique
                    ]
                }
            },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$rdv_info.dateRdv" } }, // Grouper par jour
                    totalServiceTime: {
                        $sum: {
                            $subtract: [
                                {
                                    $add: [
                                        { $multiply: [{ $toInt: { $substrCP: ["$finService", 0, 2] } }, 60] }, // Heures en minutes
                                        { $toInt: { $substrCP: ["$finService", 3, 2] } } // Minutes
                                    ]
                                },
                                {
                                    $add: [
                                        { $multiply: [{ $toInt: { $substrCP: ["$debutService", 0, 2] } }, 60] }, // Heures en minutes
                                        { $toInt: { $substrCP: ["$debutService", 3, 2] } } // Minutes
                                    ]
                                }
                            ]
                        }
                    }
                }
            }
        ]);

        const data = {
            labels: [],
            data: {
                tempsTravailMinute: [],
                tempsTravailHeure: []
            }
        };
        
        const allDates = getDaysBetweenDates(date1,date2);
        allDates.map(date => {
            const dateString = date.toISOString().split('T')[0];
            const tempsTravail = tempsTravails.find(entry => entry._id === dateString);
            
            data.labels.push(formatterDate(date));
            data.data.tempsTravailMinute.push(tempsTravail ? tempsTravail.totalServiceTime : 0);
            data.data.tempsTravailHeure.push(tempsTravail ? tempsTravail.totalServiceTime/60 : 0);
            
        });

        
        
        

        return data;
    }catch(error){
        throw error;
    }
}


module.exports = {
    nombreReservationParJour,
    nombreReservationParMois,
    beneficeParMoisIncluantDepense,
    tempsTravailMoyenParEmploye,
    chiffreDAffaireParJour,
    chiffreDAffaireParMois,
    tempsTravailMoyenDUnEmploye
}