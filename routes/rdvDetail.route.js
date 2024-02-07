var express = require('express');
var router = express.Router();
const ctrl = require('../controller/rdvDetail.controller');


let route = '/rdvDetails';

router.post(`${route}`, ctrl.create);
router.get(`${route}`, ctrl.findAll);
router.get(`${route}/filtre`, ctrl.findIntervale);
router.get(`${route}/:id`, ctrl.findOne);
router.put(`${route}/:id`, ctrl.update);
router.delete(`${route}/:id`, ctrl.delete);

module.exports = router;
