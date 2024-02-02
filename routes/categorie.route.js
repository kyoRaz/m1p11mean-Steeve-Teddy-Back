var express = require('express');
var router = express.Router();
const categCtrl = require('../controller/categorie.controller');

/* GET users listing. */
router.get('/', categCtrl.getListCategorie);

module.exports = router;
