var express = require('express');
var router = express.Router();
const ctrl = require('../controller/user.controller');


let route = '/users';

/* GET users listing. */
router.get(`${route}`, ctrl.getListUser);
router.post(`${route}`, ctrl.signUp);
router.post(`${route}/employe`, ctrl.createEmploye);
router.post(`${route}/activation`, ctrl.activationUser);
router.post(`${route}/pwsd`, ctrl.activeAndPasswd);
router.get(`${route}/employes`, ctrl.listEmploye);
module.exports = router;
