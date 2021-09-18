const router = require('express').Router();
const userCtrl = require('./../controllers/userCtrl');

router.route('/profile/:id', userCtrl.getProfile);

module.exports = router;