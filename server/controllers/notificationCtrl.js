const Notification = require('./../models/Notification');

const notificationCtrl = {
  createNotification: async(req, res) => {
    try {
      const {content, recipients, url, image} = req.body;

      const authenticatedRecipient = recipients.find(rec => rec.user === req.user._id.toString());
      if (authenticatedRecipient) return;

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
  }
};

module.exports = notificationCtrl;