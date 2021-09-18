const router = require('express').Router();
const userCtrl = require('./../controllers/userCtrl');

router.route('/profile/:id').get(userCtrl.getProfile);

module.exports = router;