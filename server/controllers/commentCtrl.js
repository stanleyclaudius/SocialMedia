const Comment = require('./../models/Comment');
const Post = require('./../models/Post');

const commentCtrl = {
  createComment: async(req, res) => {
    try {
      const {content, tag, reply, postId} = req.body;
      if (!content)
        return res.status(400).json({msg: 'Comment content can\'t be empty.'});

      const post = await Post.findOne({_id: postId});
      if (!post)
        return res.status(404).json({msg: 'Post not found.'});

      const newComment = new Comment({
        content,
        tag,
        reply,
        user: req.user._id,
        postId
      });

      await Post.findOneAndUpdate({_id: postId}, {
        $push: {
          comments: newComment._id
        }
      }, {new: true});

      await newComment.save();

      res.status(200).json({newComment});
    } catch (err) {
      return res.status(500).json({msg: err.message});
    }
  },
  editComment: async(req, res) => {
    try {
      const {content} = req.body;
      const newComment = await Comment.findOneAndUpdate({_id: req.params.id, user: req.user._id}, {content});
      if (!newComment)
        return res.status(400).json({msg: 'Can\'t edit comment that not own by current authenticated user.'})

      res.status(200).json({newComment});
    } catch (err) {
      return res.status(500).json({msg: err.message});
    }
  }
};

module.exports = commentCtrl;