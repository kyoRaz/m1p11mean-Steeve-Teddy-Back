var express = require('express');
var router = express.Router();
const avisCtrl = require('../controller/avis.controller');

router.post('/', avisCtrl.createAvis);
router.put('/:id', avisCtrl.updateAvis)
router.delete('/:id', avisCtrl.deleteAvis);

module.exports = router;
