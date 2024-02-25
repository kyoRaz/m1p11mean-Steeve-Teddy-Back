var express = require('express');
var router = express.Router();
const ctrl = require('../controller/paiement.controller');

let route = '/paiements';

router.get(`${route}`, ctrl.getPaiements);
router.post(`${route}`, ctrl.createPaiement);
router.put(`${route}/:id`, ctrl.updatePaiement);
router.delete(`${route}/:id`, ctrl.deletePaiement);
router.get(`${route}/valider/:id`, ctrl.validerPaiement);
router.get(`${route}/annuler/:id`, ctrl.annulerPaiement);

module.exports = router