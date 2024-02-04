var express = require('express');
var router = express.Router();
const ctrl = require('../controller/login.controller');


let route = '/login';

router.post(`${route}`, ctrl.auth);

module.exports = router;
