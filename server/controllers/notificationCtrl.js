const Notification = require('./../models/Notification');

const notificationCtrl = {
  createNotification: async(req, res) => {
    try {
      const {user, content, from, image, url, special} = req.body;

      if (from === req.user._id.toString() && !special) return;

      const newNotification = await Notification.findOneAndUpdate({user}, {
        $push: {
          data: {
            content,
            from,
            image,
            url
          }
        }
      }, {new: true});

      res.status(200).json({newNotification});
    } catch (err) {
      return res.status(500).json({msg: err.message});
    }
  },
  getNotification: async(req, res) => {
    try {
      const notifications = await Notification.find({'user': req.user._id}).sort('-createdAt').populate('user data.from', 'avatar username');
      res.status(200).json({
        notifications: notifications[0].data
      });
    } catch (err) {
      return res.status(500).json({msg: err.message});
    }
  }
};

module.exports = notificationCtrl;