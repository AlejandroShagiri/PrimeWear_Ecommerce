const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require("uuid");
const moment = require('moment');
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

require("dotenv").config();
const { MONGO_URI } = process.env;


//Endpoint will fetch all items in the cart or return a message if empty
const getCartItems = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    const userId = req.params.userId;

    await client.connect();
    const db = client.db("Catalogue");
    const data = await db.collection("Cart").find({ userId }).toArray();

    if (data.length !== 0) {
      res.status(200).json({
        status: 200,
        message: "Here is your cart",
        data: data,
      });
    } else {
      return res
        .status(200)
        .json({ status: 200, message: "Your cart is empty" });
    }
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: "Bad Request",
    });
  }
  client.close();
};

//Endpoint will add an item to the cart collection requires a body with the item json
const addCartItem = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    const newItem = req.body;
    newItem._id = uuidv4();

    await client.connect();
    const db = client.db("Catalogue");

    await db.collection("Cart").insertOne(newItem);
    client.close();
    return res.status(200).json({
      status: 200,
      message: "Item added to cart",
      data: newItem,
    });
  } catch (err) {
    return res.status(400).json({ status: 400, message: "Invalid data!" });
  }
};

//Endpoint modify item in the collection requires a body with the item json and itemId to be passed as a param
const updateCartItem = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    const userId = req.params.userId;
    const itemId = req.body.itemId;
    const query = { itemId, userId };
    const updateCart = { $set: { ...req.body } };
    await client.connect();
    const db = client.db("Catalogue");
    if (itemId != null) {
      const cart = await db.collection("Cart").find({ userId }).toArray();
      await db.collection("Cart").updateOne(query, updateCart);
      res.status(200).json({ status: 200, data: cart });
    } else {
      res.status(400).json({ status: 400, message: "No Id Given" });
    }
  } catch {
    return res.status(400).json({ status: 400, message: "Invalid data!" });
  }
  client.close();
};

//Endpoint deletes item in the collection requires itemId to be passed as a param
const deleteCartItem = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    const userId = req.params.userId;
    const itemId = req.body.itemId;
    await client.connect();
    const db = client.db("Catalogue");
    const result = await db.collection("Cart").deleteOne({ itemId, userId });
    res.status(201).json({ status: 201, deletedCount: result.deletedCount });
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
  client.close();
};


//Endpoint that deletes all cart Items in the Mongo database for a user
const deleteAllCart = async (req, res) => {
  try {
    const id = req.params.userId;
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("Catalogue");
    const order = await db.collection("Cart").findOne({ id });
    const result = await db.collection("Cart").deleteMany(order);
    res.status(201).json({ status: 201, deletedCount: result.deletedCount });
    client.close();
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
};


module.exports = {
  getCartItems,
  addCartItem,
  updateCartItem,
  deleteCartItem,
  deleteAllCart,
};
