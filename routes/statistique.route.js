var express = require('express');
var router = express.Router();
const ctrl = require('../controller/statistique.controller');

let route = '/statistiques';

router.get(`${route}/nombreReservationParMois`, ctrl.nombreReservationParMois);
router.get(`${route}/nombreReservationParJour`, ctrl.nombreReservationParJour);
router.get(`${route}/beneficeParMoisIncluantDepense`, ctrl.beneficeParMoisIncluantDepense);

module.exports = router