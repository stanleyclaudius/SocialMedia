const router = require('express').Router();
const messageCtrl = require('./../controllers/messageCtrl');
const isAuthenticated = require('./../middlewares/auth');

router.route('/message').post(isAuthenticated, messageCtrl.createMessage);
router.route('/conversation').get(isAuthenticated, messageCtrl.getConversation);

router.route('/message/:id').get(isAuthenticated, messageCtrl.getMessage);

module.exports = router;