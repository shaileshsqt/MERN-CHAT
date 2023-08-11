const express = require("express");
const router = express.Router();
const { protect } = require("../middalware/authMiddlaware");
const Message = require("../models/messageModel");
const Chat = require("../models/chatModel");
const User = require("../models/userModel");

router.get("/:chatId", protect, async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name pic email")
      .populate("chat");
    res.json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

router.post("/createMessage", protect, async (req, res) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }

  let newMessage = await new Message({
    sender: req.user._id,
    content: content,
    chat: chatId,
  });

  newMessage.save().then(async (message) => {
    console.log("Message::", await message.populate("sender", "name pic"));
    if (message) {
      message = await message.populate("sender", "name pic");
      message = await message.populate("chat");
      message = await User.populate(message, {
        path: "chat.users",
        select: "name pic email",
      });

      Chat.findByIdAndUpdate(req.body.chatId, {
        latestMessage: message,
      });

      res.json(message);
    } else {
      res.status(400);
      throw new Error(error.message);
    }
  });
});

module.exports = router;
