const AsyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const registerUser = AsyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please Enter all Fields");
  }
  const userExist = await User.findOne({ email });

  if (!userExist) {
    res.status(400);
    throw new Error(" User Already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    pic,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
      pic: user.pic,
    });
  } else {
    res.status(400);
    throw new Error("Fail to Create New User");
  }
});

module.export = { registerUser };
