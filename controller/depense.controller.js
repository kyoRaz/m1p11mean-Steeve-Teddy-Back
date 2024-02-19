const depenseService = require('../services/depense.service');

exports.create = async (req, res) => {
    try {
        let { montant,description,date,idTypeDepense } = req.body;
        if (!description || description == "") {
            return res.status(400).json({ message: "Bad Request", details: 'Description vide' });
        }

        if (!idTypeDepense || idTypeDepense == "") {
            return res.status(400).json({ message: "Bad Request", details: 'Type de dépense vide' });
        }

        if (!montant) {
            return res.status(400).json({ message: "Bad Request", details: 'Montant de dépense vide' });
        }else{
            if(montant<=0){
                return res.status(400).json({ message: "Bad Request", details: 'Le montant de dépense doit être strictement positif' });
            }
        }


        if(!date){
            date = new Date();
        }else{
            date = new Date(date);
            date.setHours(0, 0, 0, 0);
            const now = new Date();
            now.setHours(0, 0, 0, 0);
            if (date > now) {
                return res.status(400).json({ message: "La date ne doit pas être une date supérieure à aujourd'hui." });
            }
        }

        let data = { montant,description,date,idTypeDepense };
        
        let newDepense = await depenseService.create(data);
        return res.status(200).json({ message: "Success", depense: newDepense });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error Server" });
    }
}

exports.findAll = async (req, res) => {
    try {
        let list = await depenseService.find();
        return res.status(200).json({ size: list.length,resultat: list });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error Server" });
    }
}

exports.update = async (req, res) => {
    try {
        let id = req.params.id;
        let { description,idTypeDepense } = req.body;
        if (!description || description == "") {
            return res.status(400).json({ message: "Bad Request", details: 'Description vide' });
        }

        if (!idTypeDepense || idTypeDepense == "") {
            return res.status(400).json({ message: "Bad Request", details: 'Type de dépense vide' });
        }
        
        let list = await depenseService.update(id, { description,idTypeDepense });
        return res.status(200).json({ resultat: list });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error Server" });
    }
}

exports.delete = async (req, res) => {
    try {
        let id = req.params.id;
        await depenseService.deleteById(id);
        return res.status(200).json({ message: "suppression effectué" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error Server" });
    }
}

exports.findById = async (req, res) => {
    try {
        let id = req.params.id;
        let depense = await depenseService.findById(id);
        return res.status(200).json({ resultat: depense });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error Server" });
    }
}