var express = require('express');
var router = express.Router();
const ctrl = require('../controller/test.controller');


let route = '/test';

router.get(`${route}`, ctrl.sendMail);
router.get(`${route}/RDV`, ctrl.getRDVProche);
router.get(`${route}/rappel`, ctrl.sendMailRappel);

module.exports = router;
