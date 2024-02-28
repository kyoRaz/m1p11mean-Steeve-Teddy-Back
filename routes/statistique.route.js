var express = require('express');
var router = express.Router();
const ctrl = require('../controller/statistique.controller');
const { auth } = require('../helpers/auth');

let route = '/statistiques';

router.get(`${route}/nombreReservationParMois`, [auth], ctrl.nombreReservationParMois);
router.get(`${route}/nombreReservationParJour`, [auth], ctrl.nombreReservationParJour);
router.get(`${route}/beneficeParMoisIncluantDepense`, [auth], ctrl.beneficeParMoisIncluantDepense);
router.get(`${route}/tempsTravailMoyenParEmploye`, [auth], ctrl.tempsTravailMoyenParEmploye);
router.get(`${route}/chiffreDAffaireParMois`, [auth], ctrl.chiffreDAffaireParMois);
router.get(`${route}/chiffreDAffaireParJour`, [auth], ctrl.chiffreDAffaireParJour);
router.get(`${route}/tempsTravailMoyenDUnEmploye`, [auth], ctrl.tempsTravailMoyenDUnEmploye);

module.exports = router