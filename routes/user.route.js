var express = require('express');
var router = express.Router();
const ctrl = require('../controller/user.controller');


let route = '/users';

/* GET users listing. */
router.get(`${route}`, ctrl.getListUser);
router.post(`${route}`, ctrl.signUp);
router.post(`${route}/employe`, ctrl.createEmploye);

module.exports = router;
