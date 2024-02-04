const mailService = require('../services/mail.service');

exports.sendMail = async (req, res) => {
    try {
        mailService.sendMail();
        return res.status(200).json({ message: "Success" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error Server" });
    }
}
