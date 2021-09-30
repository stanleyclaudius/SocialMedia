const Conversation = require('./../models/Conversation');
const Message = require('./../models/Message');

const messageCtrl = {
  createMessage: async(req, res) => {
    try {
      const {sender, recipient, text, media, call} = req.body;

      const conversation = await Conversation.findOneAndUpdate({
        $or: [
          {recipients: [sender, recipient]},
          {recipients: [recipient, sender]}
        ]
      }, {
        recipients: [sender, recipient], text, media, call
      }, {new: true, upsert: true});

      const message = new Message({
        conversation: conversation._id,
        sender,
        recipient,
        text,
        media,
        call
      });

      await message.save();

      res.json({msg: 'Chat created.'});
    } catch (err) {
      return res.status(500).json({msg: err.message});
    }
  },
  getConversation: async(req, res) => {
    try {
      const conversation = await Conversation.find({recipients: req.user._id}).populate('recipients', 'avatar username name').sort('-updatedAt');

      res.status(200).json({conversation});
    } catch (err) {
      return res.status(500).json({msg: err.message});
    }
  },
  getMessage: async(req, res) => {
    try {
      const message = await Message.find({
        $or: [
          {sender: req.user._id, recipient: req.params.id},
          {sender: req.params.id, recipient: req.user._id}
        ]
      }).populate('sender recipient', 'avatar username name');

      res.status(200).json({message});
    } catch (err) {
      return res.status(500).json({msg: err.message});
    }
  },
  deleteConversation: async(req, res) => {
    try {
      const conversation = await Conversation.findOneAndDelete({
        $or: [
          {recipients: [req.user._id, req.params.id]},
          {recipients: [req.params.id, req.user._id]}
        ]
      });

      await Message.deleteMany({conversation: conversation._id});

      res.status(200).json({msg: 'Conversation deleted.'});
    } catch (err) {
      return res.status(500).json({msg: err.message});
    }
  }
};

module.exports = messageCtrl;