const User = require('./../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authCtrl = {
  register: async(req, res) => {
    const {name, username, email, password, confirmPassword} = req.body;
    const formattedUsername = username.toLowerCase().replace(/ /g, '');

    try {
      const findUsername = await User.findOne({username: formattedUsername});
      if (findUsername)
        return res.status(400).json({msg: 'Username has been taken before.'});

      const findEmail = await User.findOne({email});
      if (findEmail)
        return res.status(400).json({msg: 'Email has been taken before.'});

      if (password.length < 6)
        return res.status(400).json({msg: 'Password should be at least 6 characters.'});

      if (password !== confirmPassword)
        return res.status(400).json({msg: 'Password confirmation does not match.'});

      const passwordHash = await bcrypt.hash(password, 12);

      const newUser = new User({
        name,
        email,
        username: formattedUsername,
        password: passwordHash
      });
      await newUser.save();

      const accessToken = createAccessToken({id: newUser._id});
      const refreshToken = createRefreshToken({id: newUser._id});

      res.cookie('srsocialrftoken', refreshToken, {
        path: '/api/refresh_token',
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000
      });

      res.status(200).json({
        msg: 'User registered.',
        accessToken,
        user: {
          ...newUser._doc,
          password: ''
        }
      });
    } catch (err) {
      return res.status(500).json({msg: err.message});
    }
  },
  login: async(req, res) => {
    const {email, password} = req.body;

    try {
      const user = await User.findOne({email});
      if (!user)
        return res.status(400).json({msg: 'Invalid credential.'});

      const isPwMatch = await bcrypt.compare(password, user.password);
      if (!isPwMatch)
        return res.status(400).json({msg: 'Invalid credential.'});

      const accessToken = createAccessToken({id: user._id});
      const refreshToken = createRefreshToken({id: user._id});

      res.cookie('srsocialrftoken', refreshToken, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
        path: '/api/refresh_token'
      });

      res.status(200).json({
        msg: `Authenticated as ${user.name}`,
        accessToken,
        user: {
          ...user._doc,
          password: ''
        }
      });
    } catch (err) {
      return res.status(500).json({msg: err.message});
    }
  },
  logout: async(req, res) => {
    try {
      res.clearCookie('srsocialrftoken', {
        path: '/api/refresh_token'
      });

      res.status(200).json({
        msg: 'Logout success.'
      });
    } catch (err) {
      return res.status(500).json({msg: err.message});
    }
  },
  generateAccessToken: async(req, res) => {
    try {
      const rfToken = req.cookies.srsocialrftoken;
      if (!rfToken)
        return res.status(400).json({msg: 'Please login first.'});

      jwt.verify(rfToken, process.env.REFRESH_TOKEN_SECRET, async(err, result) => {
        if (err)
          return res.status(400).json({msg: 'Please login first.'});

        const user = await User.findById(result.id).select('-password');
        if (!user)
          return res.status(404).json({msg: 'User not found.'});

        const accessToken = createAccessToken({id: user._id});

        res.status(200).json({
          accessToken,
          user
        });
      })
    } catch (err) {
      return res.status(500).json({msg: err.message});
    }
  }
};

const createAccessToken = payload => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1d'});
}

const createRefreshToken = payload => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '30d'});
}

module.exports = authCtrl;