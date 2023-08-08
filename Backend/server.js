const express = require("express");
const dotenv = require("dotenv");
const app = express();
const connectDB = require("./config/db");
const colors = require("colors");
const userRoute = require("./routes/userRoute");
const chatRoute = require("./routes/chatRoute")

const cors = require("cors");
const { notFound, errorHandler } = require("./middalware/errorMiddlaware");

dotenv.config();
connectDB();

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use("/api/user", userRoute);
app.use("/api/chat", chatRoute)
app.use(notFound);
app.use(errorHandler);
app.get("/", (req, res) => {
  res.send("API is running");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, console.log(`Server Started on  PORT ${PORT}`.yellow.bold));
