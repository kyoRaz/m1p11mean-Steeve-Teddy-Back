var express = require('express');
var router = express.Router();
const ctrl = require('../controller/statistique.controller');
const { auth } = require('../helpers/auth');

let route = '/statistiques';

router.get(`${route}/nombreReservationParMois`, [auth], ctrl.nombreReservationParMois);
router.get(`${route}/nombreReservationParJour`, [auth], ctrl.nombreReservationParJour);
router.get(`${route}/beneficeParMoisIncluantDepense`, [auth], ctrl.beneficeParMoisIncluantDepense);

module.exports = router