require('dotenv').config();
var express = require('express');
var cors = require('cors');
const routes = require("./routes");
const bodyParser = require("body-parser");
const cron = require('node-cron');
const mailService = require('./services/mail.service');
require('./dbconnection/db');

var app = express();


app.use(cors('*'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// importation swagger
const swaggerUi = require('swagger-ui-express');
const specs = require('./swagger-config');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

//morgan
const morgan = require('morgan');
app.use(morgan('dev'));



//Route 
app.use("/api/beauty", routes);

// Cron
const dailyTask = async () => {
  await mailService.sendRappel();
};

// Planifier la tâche quotidienne à 15h00
cron.schedule('0 15 * * *', dailyTask, {
  scheduled: true,
  timezone: "Africa/Nairobi"
});



// GESTION DES ERREUR 404 // ze code de routage eo ambony daoly
var notFound = (req, res, next) => {
  res.setHeader('Content-Type', 'text/plain');
  res.send(404, 'Page introuvable !');
}
app.use(notFound);

let env = process.env;
app.listen(env.APP_PORT,
  () => {
    console.log("Démarrage du serveur");
  }
);

module.exports = app;
