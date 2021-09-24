const Post = require('./../models/Post');
const Comment = require('./../models/Comment');

class APIFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  paginate() {
    const page = this.queryStr.page * 1 || 1;
    const limit = this.queryStr.limit * 1 || 9;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

const postCtrl = {
  getPosts: async(req, res) => {
    try {
      const features = new APIFeatures(Post.find({user: [req.user._id, ...req.user.followings]}), req.query).paginate();
      const posts = await features.query
        .sort('-createdAt')
        .populate('user likes', 'avatar username name')
        .populate({
          path: 'comments',
          populate: {
            path: 'user likes',
            select: '-password'
          }
        });
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
  },
  deletePost: async(req, res) => {
    try {
      await Comment.deleteMany({postId: req.params.id});
      const post = await Post.findOneAndDelete({_id: req.params.id, user: req.user._id});

      res.status(200).json({
        msg: 'Post deleted',
        post
      });
    } catch (err) {
      return res.status(500).json({msg: err.message});
    }
  },
  getDiscoverPost: async(req, res) => {
    try {
      const excluded = [req.user._id, ...req.user.followings];

      const num = req.query.num || 9;
      const posts = await Post.aggregate([
        {$match: {user: {$nin: excluded}}},
        {$sample: {size: Number(num)}}
      ]);

      res.status(200).json({
        posts,
        result: posts.length
      });
    } catch (err) {
      return res.status(500).json({msg: err.message});
    }
  },
  getUserPost: async(req, res) => {
    try {
      const features = new APIFeatures(
        Post.find({user: req.params.id}),
        req.query
      ).paginate();

      const posts = await features.query.sort('-createdAt');
      if (!posts)
        return res.status(404).json({msg: 'Posts not found.'});

      res.status(200).json({
        posts,
        result: posts.length
      });
    } catch (err) {
      return res.status(500).json({msg: err.message});
    }
  },
  getPost: async(req, res) => {
    try {
      const post = await Post.findById(req.params.id)
        .populate('likes user', 'avatar name username')
        .populate({
          path: 'comments',
          populate: {
            path: 'user likes',
            select: '-password'
          }
        });

      if (!post)
        return res.status(404).json({msg: 'Post not found.'});

      res.status(200).json({
        post
      })
    } catch (err) {
      return res.status(500).json({msg: err.message});
    }
  },
  getSavedPost: async(req, res) => {
    try {
      const features = new APIFeatures(
        Post.find({_id: {$in: req.user.saved}}),
        req.query
      ).paginate();
      const posts = await features.query.sort('-createdAt');

      res.status(200).json({
        posts,
        result: posts.length
      })
    } catch (err) {
      return res.status(500).json({msg: err.message});
    }
  }
};

module.exports = postCtrl;