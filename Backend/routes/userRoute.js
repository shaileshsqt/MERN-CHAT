const express = require("express");
const router = express.Router();
const generateToken = require("../config/generateToken");
const User = require("../models/userModel");
const { protect } = require("../middalware/authMiddlaware");

// const registerUser = require("../controller/userControllers");
// const userModel = require("../models/userModel");

router.post("/signUp", async (req, res) => {
  const { name, email, password, pic } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please Enter all Fields");
  }

  // const userExist = await User.findOne({ email });

  // console.log("Find User", userExist);
  // if (!userExist) {
  //   res.status(400);
  //   throw new Error(" User Already exists");
  // }

  // const user = await User.create({
  //   name,
  //   email,
  //   password,
  //   pic,
  // });

  let user = await new User({
    name,
    email,
    password,
    pic,
  });

  user.save().then((result) => {
    if (result) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        password: user.password,
        pic: user.pic,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Fail to Create New User");
    }
  });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

router.get("/", protect, async (req, res) => {
  console.log("Search::", req.query.search);
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  console.log("Send Response:::", users);
  res.send(users);
});

module.exports = router;
