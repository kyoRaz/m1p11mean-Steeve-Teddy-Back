const nodemailer = require('nodemailer');
const rdvService = require('./rdv.service');
const rdvDetailService = require('./rdvDetail.service');
const { format, parseISO } = require('date-fns');
const { fr } = require('date-fns/locale');

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

const rappelMail = (mailUser, data) => {
    try {
        let { dateRdv, heureRDV } = data;
        date_obj = parseISO(dateRdv);
        date_readable = format(date_obj, 'EEEE dd MMMM yyyy', { locale: fr });
        let config = getEmailTransport();
        let transporter = nodemailer.createTransport(config);

        // Options de l'email
        let mailOptions = {
            to: mailUser,
            subject: 'Rappel  sur  votre RDV  chez Beauty',
            html: `
            <!DOCTYPE html>
                <html lang="fr">
                <head>
                    <meta charset="UTF-8">
                    <title>Rappel de Rendez-vous</title>
                    <style>
                        body { font-family: Arial, sans-serif; }
                        .container { background-color: #f0f0f0; padding: 20px; }
                        .message { background-color: #ffffff; padding: 20px; border-radius: 10px; }
                        .header { color: #333366; font-size: 24px; }
                        .content { margin-top: 20px; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="message">
                            <div class="header">Rappel de Votre Rendez-vous</div>
                            <div class="content">
                                <p>Bonjour,</p>
                                <p>Nous tenions à vous rappeler que vous avez un rendez-vous prévu demain dans notre salon de beauté.</p>
                                <p><b>Date et Heure :</b> ${date_readable}  - ${heureRDV} </p>
                                <p>Nous avons hâte de vous accueillir et de vous offrir le meilleur de nos services. Si vous avez besoin de modifier ou d'annuler votre rendez-vous, veuillez nous contacter dès que possible.</p>
                                <p>Merci de choisir Beauty. À demain !</p>
                                <p>Cordialement,</p>

                            </div>
                        </div>
                    </div>
                </body>
                </html>

            `
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

const sendRappel = async () => {
    try {
        let listRDV = await rdvService.getRDVProche();
        for (let rdv of listRDV) {
            let mail = rdv.idUser.email;
            let rdvD = await rdvDetailService.findByIdRDV(rdv._id)?.[0];
            let data = {
                dateRdv: rdv.dateRdv.toISOString().split('T')[0],
                heureRDV: rdvD?.debutService
            }
            rappelMail(mail, data);
        }
    } catch (error) {
        throw error;
    }
}


module.exports = {
    sendMail,
    sendMailActivation,
    sendRappel
}