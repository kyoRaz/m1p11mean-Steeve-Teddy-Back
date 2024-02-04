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
        const { nom, prenom, email, password } = req.body;
        const nouvelUtilisateur = await utilisateurService.doInscription(
            nom,
            prenom,
            email,
            password
        );
        res.status(200).json(nouvelUtilisateur);
    } catch (error) {
        console.log("🚀 ~ file: user.controller.js:16 ~ exports.signUp= ~ error:", error)
        res.status(400).json({ message: error.message });
    }
}