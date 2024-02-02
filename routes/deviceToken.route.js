var express = require('express');
var router = express.Router();
const deviceCtrl = require('../controller/deviceToken.controller');

/* GET users listing. */
router.post('/', deviceCtrl.checkToken);
router.get('/', deviceCtrl.getAllToken);

module.exports = router;
