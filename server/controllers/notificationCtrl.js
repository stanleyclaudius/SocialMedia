const Notification = require('./../models/Notification');

const notificationCtrl = {
  createNotification: async(req, res) => {
    try {
      const {content, recipients, url, image} = req.body;

      const authenticatedRecipient = recipients.find(rec => rec.user === req.user._id.toString());
      if (authenticatedRecipient) return res.status(200).json({msg: 'Notification won\'t pass to yourself.'});

      const newNotification = new Notification({
        content,
        recipients,
        url,
        image,
        user: req.user._id
      });

      await newNotification.save();

      res.status(200).json({
        msg: 'Notifcation created.',
        notification: newNotification
      });
    } catch (err) {
      return res.status(500).json({msg: err.message});
    }
  },
  getNotification: async(req, res) => {
    try {
      const notifications = await Notification.find({'recipients.user': req.user._id}).sort('-createdAt').populate('user', 'avatar username');
      res.status(200).json({
        notifications
      });
    } catch (err) {
      return res.status(500).json({msg: err.message});
    }
  },
  deleteNotification: async(req, res) => {
    try {
      const notification = await Notification.findOneAndDelete({
        user: req.params.user, url: req.query.url
      });

      res.status(200).json({notification});
    } catch (err) {
      return res.status(500).json({msg: err.message});
    }
  }
};

module.exports = notificationCtrl;