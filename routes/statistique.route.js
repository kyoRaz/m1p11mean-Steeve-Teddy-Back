var express = require('express');
var router = express.Router();
const ctrl = require('../controller/statistique.controller');

let route = '/statistiques';

router.get(`${route}/nombreReservationParMois`, ctrl.nombreReservationParMois);
router.get(`${route}/nombreReservationParJour`, ctrl.nombreReservationParJour);

module.exports = router