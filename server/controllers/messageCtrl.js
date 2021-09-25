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
  }
};

module.exports = messageCtrl;