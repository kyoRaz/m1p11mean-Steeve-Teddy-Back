var express = require('express');
var router = express.Router();
const ctrl = require('../controller/depense.controller');
const { auth } = require('../helpers/auth');

let route = '/depenses';

router.post(`${route}`, [auth], ctrl.create);


router.get(`${route}`, [auth], ctrl.findAll);

router.get(`${route}/filtre`, [auth], ctrl.find);


router.put(`${route}/:id`, [auth], ctrl.update);


router.delete(`${route}/:id`, [auth], ctrl.delete);
router.get(`${route}/:id`, [auth], ctrl.findById);

module.exports = router;
