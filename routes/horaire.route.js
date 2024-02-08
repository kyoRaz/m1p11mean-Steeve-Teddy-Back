var express = require('express');
var router = express.Router();
const ctrl = require('../controller/horaire.controller');


let route = '/horaires';

router.post(`${route}`, ctrl.create);
router.get(`${route}`, ctrl.findAll);
router.get(`${route}/check`, ctrl.checkHoraire);
router.get(`${route}/:id`, ctrl.findOne);
router.put(`${route}/:id`, ctrl.update);
router.delete(`${route}/:id`, ctrl.delete);

module.exports = router;
