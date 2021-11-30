const router = require('express').Router();
const isAuthenticated = require('./../middlewares/auth');
const commentCtrl = require('./../controllers/commentCtrl');

router.route('/comment').post(isAuthenticated, commentCtrl.createComment);
router.route('/comment/:id')
  .patch(isAuthenticated, commentCtrl.editComment)
  .delete(isAuthenticated, commentCtrl.deleteComment);

router.route('/comment/like/:id').patch(isAuthenticated, commentCtrl.likeComment);
router.route('/comment/unlike/:id').patch(isAuthenticated, commentCtrl.unlikeComment);

module.exports = router;