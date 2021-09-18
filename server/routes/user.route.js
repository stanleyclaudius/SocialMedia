const router = require('express').Router();
const userCtrl = require('./../controllers/userCtrl');

router.route('/search').get(userCtrl.searchUser);
router.route('/profile/:id').get(userCtrl.getProfile);

module.exports = router;