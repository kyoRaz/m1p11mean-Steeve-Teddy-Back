var express = require('express');
var router = express.Router();
const ctrl = require('../controller/user.controller');


let route = '/users';

/* GET users listing. */
// router.get('/', ctrl.getListUser);
// router.post('/signup', ctrl.signUp);
router.get(`${route}`, (req, res) => {
    res.status(200).json({ message: "Hi" });
});

module.exports = router;
