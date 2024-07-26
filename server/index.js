const express = require("express");
const cors = require("cors");
const router = require("./routes/index.js");
const cookieParser = require("cookie-parser");
const {app,server}= require("./socket/index.js");
require("dotenv").config();
const connectDB = require("./config/connectDB");

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methodS: ["GET", "POST", "PUT", "DELETE", "UPDATE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.cookie("testCookie", "testValue", {
    httpOnly: true,
  });
  res.json({
    message: "Hello",
  });
});
app.use("/api", router);

connectDB();
server.listen(PORT, () => {
  console.log("listening on port:" + PORT);
});
