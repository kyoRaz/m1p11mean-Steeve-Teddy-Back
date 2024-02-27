const mailService = require('../services/mail.service');
const rdvService = require('../services/rdv.service');
const rdvDetailService = require('../services/rdvDetail.service');

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
        let list = await r  dvService.getRDVProche();
        return res.status(200).json(list);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error Server" });
    }
}

exports.getTacheEffectuer = async (req, res) => {
    try {
        let { id, debut, fin } = req.query;

        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!debut || !fin || !dateRegex.test(debut) || !dateRegex.test(fin)) {
            return res.status(400).json({ message: "Les dates doivent être au format YYYY-MM-DD et ne peuvent pas être vides." });
        }
        let list = await rdvDetailService.getTacheEffectue(id, debut, fin);
        return res.status(200).json(list);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error Server" });
    }
}