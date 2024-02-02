var express = require('express');
var router = express.Router();
const userCtrl = require('../controller/user.controller');


/* GET users listing. */
router.get('/', userCtrl.getListUser);
router.post('/signup', userCtrl.signUp);

module.exports = router;
