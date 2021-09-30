const router = require('express').Router();
const messageCtrl = require('./../controllers/messageCtrl');
const isAuthenticated = require('./../middlewares/auth');

router.route('/message').post(isAuthenticated, messageCtrl.createMessage);
router.route('/conversation').get(isAuthenticated, messageCtrl.getConversation);

router.route('/message/:id')
  .get(isAuthenticated, messageCtrl.getMessage)
  .delete(isAuthenticated, messageCtrl.deleteConversation);

module.exports = router;