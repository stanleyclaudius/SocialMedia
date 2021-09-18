const User = require('./../models/User');

const userCtrl = {
  getProfile: async(req, res) => {
    try {
      const {id} = req.params;
      const user = await User.findById(id).select('-password').populate('followers followings', 'avatar username fullname');
      if (!user)
        return res.status(400).json({msg: 'User not found.'});

      res.status(200).json({user})
    } catch (err) {
      return res.status(500).json({msg: err.message});
    }
  }
};

module.exports = userCtrl;