const nodemailer = require('nodemailer');


const getEmailTransport = () => {
    return {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // Utiliser true pour le port 465 (SSL/TLS)
        auth: {
            user: process.env.EMAIL_ADDRESS, // generated ethereal user
            pass: process.env.EMAIL_PASSWORD, // generated ethereal password
        },
    }
}


const sendMail = () => {
    try {
        // Configuration du transporteur SMTP
        let config = getEmailTransport();
        let transporter = nodemailer.createTransport(config);

        // Options de l'email
        let mailOptions = {
            to: 'steeverazafimahatratra@gmail.com',
            subject: 'Activation de votre compte',
            html: '<p>Cliquez sur le lien suivant pour activer votre compte :</p><a href="lienDActivation">Activer mon compte</a>'
        };

        // Envoi de l'email
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email envoyé : ' + info.response);
            }
        });
    } catch (error) {
        throw error;
    }
}

const sendMailActivation = (mailUser, token) => {
    try {
        // Configuration du transporteur SMTP
        let config = getEmailTransport();
        let transporter = nodemailer.createTransport(config);

        // Options de l'email
        let mailOptions = {
            to: mailUser,
            subject: 'Activation de votre compte',
            html: `<p>Cliquez sur le lien suivant pour activer votre compte :</p><a href="${process.env.URL_FRONT}extra/activate?token=${token}">Activer mon compte</a>`
        };

        // Envoi de l'email
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email envoyé : ' + info.response);
            }
        });
    } catch (error) {
        throw error;
    }
}

module.exports = {
    sendMail,
    sendMailActivation
}