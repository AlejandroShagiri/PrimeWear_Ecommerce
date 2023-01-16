const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require("uuid");
const moment = require('moment');
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

require("dotenv").config();
const { MONGO_URI } = process.env;

//for finding the businesses from the product names
//db.users.findOne({"username" : {$regex : "son"}});

// GET all the orders in the orders collection
const getAllOrders = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("Catalogue");
    const result = await db.collection("Orders").find().toArray();

    res.status(200).json({
      status: 200,
      message: "Get-all orders successful",
      data: result,
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: "Bad Request",
    });
  }
  client.close();
};

// GET single order based on order ID
const getSingleOrder = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("Catalogue");
    const id = req.params.orderId;
    const result = await db.collection("Orders").findOne({ id });
    res.status(200).json({
      status: 200,
      message: "Get order successful",
      data: result,
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: "Bad Request",
    });
  }
  client.close();
};

//creates an order in the backend
const createOrder = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    const order = req.body;
    const {
      firstName,
      lastName,
      phone,
      address,
      email,
      price,
      items,
      creditCard,
      expiration,
    } = order;
    order.id = uuidv4();

    await client.connect();
    const db = client.db("Catalogue");

    items.forEach(async (item) => {
      const dbitem = await db.collection("Items").findOne({ _id: item.itemId });
      if (dbitem !== undefined && dbitem.numInStock > 0) {
        const updateResult = await db
          .collection("Items")
          .updateOne(
            { _id: dbitem._id },
            { $set: { numInStock: dbitem.numInStock - 1 } }
          );
      } else {
        return res
          .status(400)
          .json({ status: 400, message: `${item.name} not in stock!` });
      }
    });

    await db.collection("Orders").insertOne({
      creditCard: creditCard,
      expiration: expiration,
      id: order.id,
      firstName: firstName,
      lastName: lastName,
      phone: phone,
      address: address,
      email: email,
      price: price,
      items: items,
    });

    return res.status(200).json({
      status: 200,
      message: "Order created successfully",
      data: order,
    });
  } catch {
    return res.status(400).json({ status: 400, message: "Invalid data!" });
  }
};
//updates an order
const updateOrder = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    const id = req.params.orderId;
    const query = { id };
    const updatedOrder = { $set: { ...req.body } };

    await client.connect();
    const db = client.db("Catalogue");

    if (id != null) {
      await db.collection("Orders").updateOne(query, updatedOrder);
      res.status(200).json({ status: 200, ...req.body });
    } else {
      res.status(400).json({ status: 400, message: "No Id Given" });
    }
    client.close();
  } catch {
    return res.status(400).json({ status: 400, message: "Invalid data!" });
  }
};

//deletes an order
const deleteOrder = async (req, res) => {
  try {
    const id = req.params.orderId;
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("Catalogue");
    const order = await db.collection("Orders").findOne({ id });
    const result = await db.collection("Orders").deleteOne(order);
    res.status(201).json({ status: 201, deletedCount: result.deletedCount });
    client.close();
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
};

module.exports = {
  getSingleOrder,
  getAllOrders,
  createOrder,
  updateOrder,
  deleteOrder,
};
