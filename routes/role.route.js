var express = require('express');
var router = express.Router();
const ctrl = require('../controller/role.controller');


let route = '/roles';

router.post(`${route}`, ctrl.create);
router.get(`${route}`, ctrl.findAll);
router.put(`${route}/:id`, ctrl.update);
router.delete(`${route}/:id`, ctrl.delete);

module.exports = router;
