var express = require('express');
var router = express.Router();
const ctrl = require('../controller/paiement.controller');
const { auth } = require('../helpers/auth');
let route = '/paiements';

router.get(`${route}`, [auth], ctrl.getPaiements);
router.post(`${route}`, [auth], ctrl.createPaiement);
router.put(`${route}/:id`, [auth], ctrl.updatePaiement);
router.delete(`${route}/:id`, [auth], ctrl.deletePaiement);
router.get(`${route}/valider/:id`, [auth], ctrl.validerPaiement);
router.get(`${route}/annuler/:id`, [auth], ctrl.annulerPaiement);

module.exports = router