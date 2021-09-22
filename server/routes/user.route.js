const router = require('express').Router();
const userCtrl = require('./../controllers/userCtrl');
const isAuthenticated = require('./../middlewares/auth');

router.route('/search').get(isAuthenticated, userCtrl.searchUser);
router.route('/profile/:id').get(isAuthenticated, userCtrl.getProfile);
router.route('/profile').patch(isAuthenticated, userCtrl.editProfile);
router.route('/follow/:id').patch(isAuthenticated, userCtrl.followUser);
router.route('/unfollow/:id').patch(isAuthenticated, userCtrl.unfollowUser);
router.route('/user/suggestion').get(isAuthenticated, userCtrl.userSuggestion);

module.exports = router;