const { findOneAndUpdate } = require('./../models/Post');
const Post = require('./../models/Post');

const postCtrl = {
  getPosts: async(req, res) => {
    try {
      const posts = await Post.find({user: [req.user._id, ...req.user.followings]}).sort('-createdAt').populate('user likes', 'avatar username name');
      res.status(200).json({
        posts,
        result: posts.length
      })
    } catch (err) {
      return res.status(500).json({msg: err.message});
    }
  },
  createPost: async(req, res) => {
    try {
      const {content, images} = req.body;
      if (!content)
        return res.status(400).json({msg: 'Post content can\'t be blank'});

      if (images.length === 0)
        return res.stauts(400).json({msg: 'Post images can\'t be blank.'});

      const newPost = new Post({
        content,
        images,
        user: req.user._id
      });
      await newPost.save();

      res.status(200).json({
        msg: 'Post created',
        post: newPost
      });
    } catch (err) {
      return res.status(500).json({msg: err.message});
    }
  },
  editPost: async(req, res) => {
    try {
      const {content, images} = req.body;
      if (!content)
        return res.status(400).json({msg: 'Content can\'t be empty.'});
      
      if (images.length === 0) 
        return res.status(400).json({msg: 'Please provide post images.'});

      const post = await Post.findOneAndUpdate({_id: req.params.id, user: req.user._id}, {
        content,
        images
      }).populate('user likes', 'avatar username name');

      if (!post)
        return res.status(404).json({msg: 'Post not found.'});

      res.status(200).json({
        msg: 'Post edited.',
        post: {
          ...post._doc,
          content,
          images
        }
      })
    } catch (err) {
      return res.status(500).json({msg: err.message});
    }
  },
  likePost: async(req, res) => {
    try {
      const isLike = await Post.find({_id: req.params.id, likes: req.user._id});
      if (isLike.length > 0)
        return res.status(400).json({msg: 'You have liked this post.'});

      await Post.findOneAndUpdate({_id: req.params.id}, {
        $push: {
          likes: req.user._id
        }
      }, {new: true});

      res.status(200).json({msg: 'Post liked.'});
    } catch (err) {
      return res.status(500).json({msg: err.message});
    }
  },
  unlikePost: async(req, res) => {
    try {
      await Post.findOneAndUpdate({_id: req.params.id}, {
        $pull: {
          likes: req.user._id
        }
      }, {new: true});

      res.status(200).json({msg: 'Post unliked.'});
    } catch (err) {
      return res.status(500).json({msg: err.message});
    }
  }
};

module.exports = postCtrl;