var express = require('express');
var router = express.Router();
const ctrl = require('../controller/statistique.controller');

let route = '/statistiques';

router.get(`${route}/nombreReservationParMois`, ctrl.nombreReservationParMois);
router.get(`${route}/nombreReservationParJour`, ctrl.nombreReservationParJour);
router.get(`${route}/beneficeParMoisIncluantDepense`, ctrl.beneficeParMoisIncluantDepense);
router.get(`${route}/chiffreDAffaireParMois`, ctrl.chiffreDAffaireParMois);
router.get(`${route}/chiffreDAffaireParJour`, ctrl.chiffreDAffaireParJour);

module.exports = router