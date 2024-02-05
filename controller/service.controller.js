const serviceService = require('../services/service.service');


const controlInput = (req, res) => {
    const { nom, delai, prix, commission } = req.body;

    if (!nom || nom === "") {
        res.status(400).json({ message: 'Bad Request', details: 'Le nom ne doit pas être vide' });
        return false;
    }

    if (!delai || isNaN(delai) || delai < 0) {
        res.status(400).json({ message: 'Bad Request', details: 'Le délai doit être un nombre positif' });
        return false;
    }

    if (!prix || isNaN(prix) || prix < 0) {
        res.status(400).json({ message: 'Bad Request', details: 'Le prix doit être un nombre positif' });
        return false;
    }

    if (!commission || isNaN(commission) || commission < 0) {
        res.status(400).json({ message: 'Bad Request', details: 'La commission doit être un nombre positif' });
        return false;
    }

    return true;
};


exports.create = async (req, res) => {
    try {
        let {nom,delai,prix,commission} = req.body;
        let chackInput =controlInput(req, res);
        if (chackInput !== true) {
            return;
        }
        let data ={ nom,delai,prix,commission};
        let newservice = await serviceService.create(data);
        return res.status(200).json({ message: "Success", service: newservice });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error Server" });
    }
}

exports.findAll = async (req, res) => {
    try {
        let list = await serviceService.find();
        return res.status(200).json({ resultat: list });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error Server" });
    }
}

exports.update = async (req, res) => {
    try {
        let id = req.params.id ;
        let {nom,delai,prix,commission} = req.body;
        let chackInput =controlInput(req, res);
        if (chackInput !== true) {
            return;
        }
        let data ={ nom,delai,prix,commission};
        let list = await serviceService.update(id, data);
        return res.status(200).json({ resultat: list });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error Server" });
    }
}

exports.delete = async (req, res) => {
    try {
        let id = req.params.id;
        await serviceService.deleteById(id);
        return res.status(200).json({ message: "suppression effectué" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error Server" });
    }
}