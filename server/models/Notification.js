const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  content: String,
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'user'
  },
  recipients: [
    {
      user: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
      },
      isRead: {
        type: Boolean,
        default: false
      }
    }
  ],
  url: {
    type: String,
    required: true
  },
  image: String
}, {
  timestamps: true
});

module.exports = mongoose.model('notification', notificationSchema);