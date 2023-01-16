const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require("uuid");
const moment = require('moment');
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

require("dotenv").config();
const { MONGO_URI } = process.env;


//gets an array of all users from users collection
const getAllUsers = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("Catalogue");
    const result = await db.collection("Users").find().toArray();

    client.close();
    res.status(200).json({
      status: 200,
      message: "Get-all users successful",
      data: result,
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: "Bad Request",
    });
  }
};

//creates a new user from the req.body info and sends it to MongoDB
const createUser = async (req, res) => {
  try {
    const newItem = req.body;
    newItem._id = uuidv4();

    newItem.date =moment(new Date()).format("DD/MM/YYYY");

    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("Catalogue");

    await db.collection("Users").insertOne(newItem);
    client.close();

    return res.status(200).json({
      status: 200,
      message: "User Created",
      data: newItem,
    });
  } catch (err) {
    return res.status(400).json({ status: 400, message: "Invalid data!" });
  }
};

//gets a specific user based on username
const getUser = async (req, res) => {
  const userName = req.params.userName;

  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("Catalogue");

    const queryObject_Id = { userName: userName };
    const result = await db.collection("Users").find(queryObject_Id).toArray();

    client.close();
    res.status(200).json({
      status: 200,
      message: "Get users successful",
      data: result,
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: "Bad Request",
    });
  }
};

module.exports = {
  getAllUsers,
  createUser,
  getUser,
};
