var express = require('express');
var router = express.Router();
const ctrl = require('../controller/test.controller');


let route = '/test';

router.get(`${route}`, ctrl.sendMail);

module.exports = router;
