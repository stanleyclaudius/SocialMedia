const router = require('express').Router();
const isAuthenticated = require('./../middlewares/auth');
const commentCtrl = require('./../controllers/commentCtrl');

router.route('/comment').post(isAuthenticated, commentCtrl.createComment);

module.exports = router;