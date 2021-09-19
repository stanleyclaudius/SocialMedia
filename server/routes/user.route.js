const router = require('express').Router();
const userCtrl = require('./../controllers/userCtrl');
const isAuthenticated = require('./../middlewares/auth');

router.route('/search').get(isAuthenticated, userCtrl.searchUser);
router.route('/profile/:id').get(isAuthenticated, userCtrl.getProfile);
router.route('/profile').patch(isAuthenticated, userCtrl.editProfile);

module.exports = router;