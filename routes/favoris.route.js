var express = require('express');
var router = express.Router();
const favCtrl = require('../controller/favoris.controller');

router.get('/', favCtrl.getFavUser);
router.post('/', favCtrl.addFavori);
router.delete('/:id', favCtrl.delete);

module.exports = router;
