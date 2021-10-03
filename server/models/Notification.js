const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  user: {type: mongoose.Types.ObjectId, ref: 'user'},
  data: [
    {
      content: {
        type: String,
        required: true
      },
      from: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
      },
      isRead: {
        type: Boolean,
        default: false
      },
      image: String,
      url: String
    }
  ]
}, {
  timestamps: true
});

module.exports = mongoose.model('notification', notificationSchema);