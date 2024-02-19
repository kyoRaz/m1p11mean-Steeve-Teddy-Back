const Rdv = require("../models/Rdv");
const Caisse = require("../models/Caisse");
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
            endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0); 
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


        const allDates = [];
        let currentDate = new Date(startDate);
        while (currentDate <= endDate) {
            allDates.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
        }

        const result = allDates.map(date => {
            const dateString = date.toISOString().split('T')[0];
            const reservation = reservationsCount.find(entry => entry._id === dateString);
            return {
                date: dateString,
                count: reservation ? reservation.count : 0
            };
        });

        return result;
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

        
        const formattedData = months.map(monthDate => {
            const month = monthDate.getMonth() + 1; // Ajouter 1 car les mois sont à base zéro
            const year = monthDate.getFullYear();
            const monthName = monthDate.toLocaleDateString('fr-FR', { month: 'long' }); // Nom du mois en français
            const reservation = reservationsCount.find(entry => entry._id.month === month && entry._id.year === year);
            const count = reservation ? reservation.count : 0;
            return { year, month, monthName, count };
        });

        return formattedData;

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

const chiffreDAffaireParJour = async (startDate, endDate) => { 
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
            endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0); 
        }else{
            endDate = new Date(endDate);
        }

        query.dateRdv = { $gte: startDate, $lte: endDate };
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


        const allDates = [];
        let currentDate = new Date(startDate);
        while (currentDate <= endDate) {
            allDates.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
        }

        const result = allDates.map(date => {
            const dateString = date.toISOString().split('T')[0];
            const chiffreAffaire = chiffreAffaireCount.find(entry => entry._id === dateString);
            return {
                date: dateString,
                chiffreAffaire: chiffreAffaire ? chiffreAffaire.chiffreAffaire : 0
            };
        });

        return result;
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

        const chiffreAffaires = await Caisse.aggregate([
            {
                $match: {
                    date: { $gte: dateDebut, $lte: dateFin }
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

        const formattedData = months.map(monthDate => {
            const month = monthDate.getMonth() + 1; // Ajouter 1 car les mois sont à base zéro
            const year = monthDate.getFullYear();
            const monthName = monthDate.toLocaleDateString('fr-FR', { month: 'long' }); // Nom du mois en français
            const chiffreAffaireEntry = chiffreAffaires.find(entry => entry.year === year && entry.month === month);
            const chiffreAffaire = chiffreAffaireEntry ? chiffreAffaireEntry.chiffreAffaire : 0;
            return { year, month, monthName, chiffreAffaire};
        });


        return formattedData;
    }catch(error){
        throw error;
    }
}

module.exports = {
    nombreReservationParJour,
    nombreReservationParMois,
    beneficeParMoisIncluantDepense,
    chiffreDAffaireParJour,
    chiffreDAffaireParMois
}