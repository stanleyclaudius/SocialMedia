const router = require('express').Router();
const messageCtrl = require('./../controllers/messageCtrl');
const isAuthenticated = require('./../middlewares/auth');

router.route('/message').post(isAuthenticated, messageCtrl.createMessage);

module.exports = router;