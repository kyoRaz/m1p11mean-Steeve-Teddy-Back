const roleService = require('../services/role.service');

exports.create = async (req, res) => {
    try {
        let role = req.body.role;
        if (!role || role == "") {
            return res.status(400).json({ message: "Bad Request", details: 'Role vide' });
        }
        let newRole = await roleService.create(role);
        return res.status(200).json({ message: "Success", role: newRole });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error Server" });
    }
}

exports.findAll = async (req, res) => {
    try {
        let list = await roleService.find();
        return res.status(200).json({ resultat: list });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error Server" });
    }
}

exports.update = async (req, res) => {
    try {
        let id = req.params.id;
        let libelle = req.body.role;
        if (!libelle || libelle == "") {
            return res.status(400).json({ message: "Bad Request", details: 'Role vide' });
        }
        let list = await roleService.update(id, { libelle });
        return res.status(200).json({ resultat: list });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error Server" });
    }
}

exports.delete = async (req, res) => {
    try {
        let id = req.params.id;
        await roleService.deleteById(id);
        return res.status(200).json({ message: "suppression effectué" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error Server" });
    }
}