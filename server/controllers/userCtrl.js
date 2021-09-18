const User = require('./../models/User');

const userCtrl = {
  searchUser: async(req, res) => {
    const {username} = req.query;
    try {
      const user = await User.find({username: {$regex: username}}).limit(10).select('username fullname avatar');
      res.status(200).json({user});
    } catch (err) {
      return res.status(500).json({msg: err.message});
    }
  },
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