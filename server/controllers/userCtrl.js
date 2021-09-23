const User = require('./../models/User');

const userCtrl = {
  searchUser: async(req, res) => {
    const {username} = req.query;
    try {
      const users = await User.find({username: {$regex: username}}).limit(10).select('username name avatar');
      res.status(200).json({users});
    } catch (err) {
      return res.status(500).json({msg: err.message});
    }
  },
  getProfile: async(req, res) => {
    try {
      const {id} = req.params;
      const user = await User.findById(id).select('-password').populate('followers followings', 'avatar username name followers followings');
      if (!user)
        return res.status(400).json({msg: 'User not found.'});

      res.status(200).json({user})
    } catch (err) {
      return res.status(500).json({msg: err.message});
    }
  },
  editProfile: async(req, res) => {
    try {
      const {name, mobile, address, website, story, gender, avatar} = req.body;
      if (!name)
        return res.status(400).json({msg: 'Name can\'t be empty.'});

      const user = await User.findOneAndUpdate({_id: req.user._id}, {
        name, mobile, address, website, story, gender, avatar
      });

      res.status(200).json({msg: 'Profile updated.'});
    } catch (err) {
      return res.status(500).json({msg: err.message});
    }
  },
  followUser: async(req, res) => {
    try {
      const findUser = await User.findOne({_id: req.user._id, followings: req.params.id});
      if (findUser)
        return res.status(400).json({msg: 'You have followed this user.'});

      await User.findOneAndUpdate({_id: req.params.id}, {
        $push: {
          followers: req.user._id
        }
      }, {new: true});

      await User.findOneAndUpdate({_id: req.user._id}, {
        $push: {
          followings: req.params.id
        }
      }, {new: true});

      res.status(200).json({msg: 'User followed.'});
    } catch (err) {
      return res.status(500).json({msg: err.message});
    }
  },
  unfollowUser: async(req, res) => {
    try {
      await User.findOneAndUpdate({_id: req.params.id}, {
        $pull: {
          followers: req.user._id
        }
      }, {new: true});

      await User.findOneAndUpdate({_id: req.user._id}, {
        $pull: {
          followings: req.params.id
        }
      }, {new: true});

      res.status(200).json({msg: 'User unfollowed.'});
    } catch (err) {
      return res.status(500).json({msg: err.messgae});
    }
  },
  userSuggestion: async(req, res) => {
    try {
      const excludedUser = [req.user._id, ...req.user.followings];
      const users = await User.aggregate([
        {$match: {_id: {$nin: excludedUser}}},
        {$sample: {size: 9}},
        {$lookup: {from: 'user', localField: 'followers', foreignField: '_id', as: 'followers'}},
        {$lookup: {from: 'user', localField: 'followings', foreignField: '_id', as: 'followings'}}
      ]).project('-password');

      res.status(200).json({users});
    } catch (err) {
      return res.status(500).json({msg: err.message});
    }
  },
  savedPost: async(req, res) => {
    try {
      await User.findOneAndUpdate({_id: req.user._id}, {
        $push: {
          saved: req.params.id
        }
      }, {new: true});

      res.status(200).json({
        msg: 'Post saved.'
      });
    } catch (err) {
      return res.status(500).json({msg: err.message});
    }
  },
  unsavedPost: async(req, res) => {
    try {
      await User.findOneAndUpdate({_id: req.user._id}, {
        $pull: {
          saved: req.params.id
        }
      }, {new: true});

      res.status(200).json({
        msg: 'Post unsaved.'
      });
    } catch (err) {
      return res.status(500).json({msg: err.message});
    }
  }
};

module.exports = userCtrl;