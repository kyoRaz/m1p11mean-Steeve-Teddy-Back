const transactionService = require('../services/transaction.service');

exports.create = async (req, res) => {
    try {
        let transaction = req.body.transaction;
        if (!transaction || transaction == "") {
            return res.status(400).json({ message: "Bad Request", details: 'Role vide' });
        }
        let newRole = await transactionService.create(transaction);
        return res.status(200).json({ message: "Success", transaction: newRole });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error Server" });
    }
}

exports.findAll = async (req, res) => {
    try {
        let list = await transactionService.find();
        return res.status(200).json({ resultat: list });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error Server" });
    }
}

exports.update = async (req, res) => {
    try {
        let id = req.params.id;
        let libelle = req.body.transaction;
        if (!libelle || libelle == "") {
            return res.status(400).json({ message: "Bad Request", details: 'Role vide' });
        }
        let list = await transactionService.update(id, { libelle });
        return res.status(200).json({ resultat: list });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error Server" });
    }
}

exports.delete = async (req, res) => {
    try {
        let id = req.params.id;
        await transactionService.deleteById(id);
        return res.status(200).json({ message: "suppression effectué" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error Server" });
    }
}