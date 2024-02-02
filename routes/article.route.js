var express = require('express');
var router = express.Router();
const articleCtrl = require('../controller/article.controller');

/* GET users listing. */
router.get('/', articleCtrl.getListArticle);
router.post('/', articleCtrl.createArticle);

router.get('/:id', articleCtrl.getById);
router.delete('/:id', articleCtrl.deleteArticle);

module.exports = router;
