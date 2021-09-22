const router = require('express').Router();
const postCtrl = require('./../controllers/postCtrl');
const isAuthenticated = require('./../middlewares/auth');

router.route('/post')
  .post(isAuthenticated, postCtrl.createPost)
  .get(isAuthenticated, postCtrl.getPosts);

router.route('/post/:id')
  .patch(isAuthenticated, postCtrl.editPost)
  .delete(isAuthenticated, postCtrl.deletePost);

router.route('/post/like/:id').patch(isAuthenticated, postCtrl.likePost);
router.route('/post/unlike/:id').patch(isAuthenticated, postCtrl.unlikePost);

router.route('/post/discover').get(isAuthenticated, postCtrl.getDiscoverPost);

router.route('/post/user/:id').get(isAuthenticated, postCtrl.getUserPost);

module.exports = router;