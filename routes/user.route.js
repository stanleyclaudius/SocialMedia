const router = require('express').Router();
const userCtrl = require('./../controllers/userCtrl');
const isAuthenticated = require('./../middlewares/auth');

router.route('/search').get(isAuthenticated, userCtrl.searchUser);
router.route('/user/suggestion').get(isAuthenticated, userCtrl.userSuggestion);
router.route('/profile').patch(isAuthenticated, userCtrl.editProfile);
router.route('/follow/:id').patch(isAuthenticated, userCtrl.followUser);
router.route('/unfollow/:id').patch(isAuthenticated, userCtrl.unfollowUser);
router.route('/profile/:id').get(isAuthenticated, userCtrl.getProfile);
router.route('/user/saved/:id').patch(isAuthenticated, userCtrl.savedPost);
router.route('/user/unsaved/:id').patch(isAuthenticated, userCtrl.unsavedPost);

module.exports = router;