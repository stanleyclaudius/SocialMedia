const router = require('express').Router();
const postCtrl = require('./../controllers/postCtrl');
const isAuthenticated = require('./../middlewares/auth');

router.route('/post').post(isAuthenticated, postCtrl.createPost);

module.exports = router;