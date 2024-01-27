const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
const _PORT = process.env.PORT;

// CONNECT TO DB
const username = process.env.USERNAME,
  password = process.env.PASSWORD;
database = process.env.DB;
const mongoose = require("mongoose");
mongoose.connect(
  `mongodb+srv://${username}:${password}@atlascluster.j9uhxz8.mongodb.net/${database}?retryWrites=true&w=majority`
);

// IMPORT USER MODEL
const UserModel = require("./models/Users");

app.get("/users", async (req, res) => {
  const users = await UserModel.find();
  res.json(users);
});

app.post("/createUser", async (req, res) => {
  const newUser = new UserModel(req.body);
  await newUser.save();
  res.json(req.body);
});

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(_PORT, () => {
  console.log("the server is working fine!");
});
