var express = require('express');
var router = express.Router();
const notificationCtrl = require('../controller/notification.controller');

router.get('/test', notificationCtrl.getNotification);

module.exports = router;
