const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    maxlength: 40
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  avatar: {
    type: String,
    default: 'https://res.cloudinary.com/dpef9sjqt/image/upload/v1631933581/sr-social/avatar/default_kbe3vi.png'
  },
  gender: {
    type: String,
    default: ''
  },
  mobile: {
    type: String,
    default: ''
  },
  address: {
    type: String,
    default: ''
  },
  story: {
    type: String,
    default: '',
    maxlength: 300
  },
  website: {
    type: String,
    default: ''
  },
  followers: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'user'
    }
  ],
  followings: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'user'
    }
  ]
}, {
  timestamps: true
});

module.exports = mongoose.model('user', userSchema);