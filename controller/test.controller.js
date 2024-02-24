const mailService = require('../services/mail.service');
const rdvService = require('../services/rdv.service');

exports.sendMail = async (req, res) => {
    try {
        mailService.sendMail();
        return res.status(200).json({ message: "Success" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error Server" });
    }
}

exports.sendMailRappel = async (req, res) => {
    try {
        await mailService.sendRappel();
        return res.status(200).json({ message: "Success" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error Server" });
    }
}

exports.getRDVProche = async (req, res) => {
    try {
        let list = await rdvService.getRDVProche();
        return res.status(200).json(list);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error Server" });
    }
}


