var express = require('express');
var router = express.Router();
const ctrl = require('../controller/depense.controller');


let route = '/depenses';

router.post(`${route}`, ctrl.create);


router.get(`${route}`, ctrl.findAll);

router.get(`${route}/filtre`, ctrl.find);


router.put(`${route}/:id`, ctrl.update);


router.delete(`${route}/:id`, ctrl.delete);
router.get(`${route}/:id`, ctrl.findById);

module.exports = router;
