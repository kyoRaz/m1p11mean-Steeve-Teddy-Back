require('dotenv').config();
var express = require('express');
var cors = require('cors');
const routes = require("./routes");
const bodyParser = require("body-parser");
require('./dbconnection/db');

var app = express();


app.use(cors('*'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//morgan
const morgan = require('morgan');
app.use(morgan('dev'));



//Route 
app.use("/api/beauty", routes);



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
