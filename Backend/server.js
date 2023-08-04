const express = require("express");
const dotenv = require("dotenv");
const app = express();

dotenv.config();
app.get("/", (req, res) => {
  res.send("API is running");
});

app.get("api/chat", (req, res) => {
  res.send("chat box here");
});

app.get("/api/chat/:id", (req, res) => {
  res.send("find by id");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, console.log(`Server Started on  PORT ${PORT}`));
