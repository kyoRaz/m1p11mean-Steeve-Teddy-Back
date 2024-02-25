var express = require('express');
var router = express.Router();
const ctrl = require('../controller/transaction.controller');
const { auth } = require('../helpers/auth');

let route = '/transactions';

router.post(`${route}`, [auth], ctrl.create);
router.get(`${route}`, [auth], ctrl.findAll);
router.put(`${route}/:id`, [auth], ctrl.update);
router.delete(`${route}/:id`, [auth], ctrl.delete);

module.exports = router;
