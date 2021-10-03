const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  user: {type: mongoose.Types.ObjectId, ref: 'user'},
  data: Array
}, {
  timestamps: true
});

module.exports = mongoose.model('notification', notificationSchema);