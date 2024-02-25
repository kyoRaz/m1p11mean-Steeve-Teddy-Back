const statistiqueService = require("../services/statistique.service");


exports.nombreReservationParJour = async (req, res) => {
    try{
        const {dateDebut,dateFin,estActif} = req.query;
        if(dateDebut && dateDebut) {
            const date1 = new Date(dateDebut);
            const date2 = new Date(dateFin);
            if(date1 > date2){
                res.status(400).json({ message: "La date de début doit être inférieure à la date fin" });
                return false;
            }
        }

        let liste = await statistiqueService.nombreReservationParJour(dateDebut,dateFin);
        res.status(200).json({ size: liste.length, resultat: liste });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error Server" });
    }
}

exports.nombreReservationParMois = async (req, res) => {
    try{
        const {annee} = req.query;
        let liste = await statistiqueService.nombreReservationParMois(annee);
        res.status(200).json({ size: liste.length, resultat: liste });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error Server" });
    }
}


exports.beneficeParMoisIncluantDepense = async (req, res) => {
    try{
        const {annee} = req.query;
        let liste = await statistiqueService.beneficeParMoisIncluantDepense(annee);
        res.status(200).json({ size: liste.length, resultat: liste });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error Server" });
    }
}

exports.tempsTravailMoyenParEmploye = async (req, res) => {
    try{
        const {dateDebut,dateFin} = req.query;
        let liste = await statistiqueService.tempsTravailMoyenParEmploye(dateDebut,dateFin);
        res.status(200).json({ size: liste.length, resultat: liste });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error Server" });
    }
}

exports.chiffreDAffaireParMois = async (req, res) => {
    try{
        const {annee} = req.query;
        let liste = await statistiqueService.chiffreDAffaireParMois(annee);
        res.status(200).json({ size: liste.length, resultat: liste });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error Server" });
    }
}

exports.chiffreDAffaireParJour = async (req, res) => {
    try{
        const {dateDebut,dateFin} = req.query;
        if(dateDebut && dateDebut) {
            const date1 = new Date(dateDebut);
            const date2 = new Date(dateFin);
            if(date1 > date2){
                res.status(400).json({ message: "La date de début doit être inférieure à la date fin" });
                return false;
            }
        }

        let liste = await statistiqueService.chiffreDAffaireParJour(dateDebut,dateFin);
        res.status(200).json({ size: liste.length, resultat: liste });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error Server" });
    }
}