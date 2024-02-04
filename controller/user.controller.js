const utilisateurService = require('../services/utilisateur.service');


exports.getListUser = async (req, res) => {
    try {
        let list = await utilisateurService.getAllUser();
        res.status(200).json({
            data: list
        });
    } catch (error) {
        res.status(500).json({ message: "Error Server" });
    }
}


exports.signUp = async (req, res) => {
    try {
        const { nom, prenom, email, password, roleId } = req.body;
        // Ampina  Controlle  
        let data = {
            nom,
            prenom,
            email,
            password,
            roleId
        };
        const nouvelUtilisateur = await utilisateurService.inscriptionClient(data);
        res.status(200).json(nouvelUtilisateur);
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "Bad Request", details: error.message });
    }
}