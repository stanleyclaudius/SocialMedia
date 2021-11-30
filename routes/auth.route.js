const router = require('express').Router();
const authCtrl = require('./../controllers/authCtrl');

router.route('/register').post(authCtrl.register);
router.route('/login').post(authCtrl.login);
router.route('/logout').post(authCtrl.logout);
router.route('/refresh_token').post(authCtrl.generateAccessToken);

module.exports = router;