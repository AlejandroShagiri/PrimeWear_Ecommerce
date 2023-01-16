const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require("uuid");
const moment = require('moment');
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

require("dotenv").config();
const { MONGO_URI } = process.env;

const getAllItems = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("Catalogue");
    const result = await db.collection("Items").find().toArray();

    client.close();
    res.status(200).json({
      status: 200,
      message: "Get-all items successful",
      data: result,
    });
  } catch (err) {
    console.log("err", err);
    res.status(400).json({
      status: 400,
      message: "Bad Request",
    });
  }
};

const getCompanies = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("Catalogue");
    const result = await db.collection("Companies").find().toArray();


    res.status(200).json({status: 200, message: "Get all companies successfully",data: result});


  } catch (err) {
    res.status(400).json({ status: 400, message: "Couldn't get the companies" });
  }
  client.close();
};

const getItemById = async (req, res) => {
  const id = req.params.id;

  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("Catalogue");

    const queryObject_Id = { _id: parseInt(id) };
    const result = await db.collection("Items").find(queryObject_Id).toArray();

    client.close();
    res.status(200).json({
      status: 200,
      message: "Get-all items successful",
      data: result,
    });
  } catch (err) {
    console.log("err", err);
    res.status(400).json({
      status: 400,
      message: "Bad Request",
    });
  }
};

const getItemsByCategory = async (req, res) => {
  const category = req.params.category;

  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("Catalogue");

    const queryObject_Category = { category: category };
    const result = await db
      .collection("Items")
      .find(queryObject_Category)
      .toArray();

    client.close();
    res.status(200).json({
      status: 200,
      message: "Get-all items successful",
      data: result,
    });
  } catch (err) {
    console.log("err", err);
    res.status(400).json({
      status: 400,
      message: "Bad Request",
    });
  }
};

const getItemsByCompany = async (req, res) => {
  const company = req.params.company;

  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("Catalogue");

    const queryObject_CompanyId = { name: company };
    const companyResult = await db
      .collection("Companies")
      .find(queryObject_CompanyId)
      .toArray();

    const queryObject_Company = { companyId: companyResult[0]._id };
    const itemResult = await db
      .collection("Items")
      .find(queryObject_Company)
      .toArray();

    client.close();
    res.status(200).json({
      status: 200,
      message: "Get-all items successful",
      data: itemResult,
    });
  } catch (err) {
    console.log("err", err);
    res.status(400).json({
      status: 400,
      message: "Bad Request",
    });
  }
};

const getItemByBodyLocation = async (req, res) => {
  const bodyLocation = req.params.bodyLocation;

  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("Catalogue");

    const queryObject_BodyLocation = { body_location: bodyLocation };
    const result = await db
      .collection("Items")
      .find(queryObject_BodyLocation)
      .toArray();

    client.close();
    res.status(200).json({
      status: 200,
      message: "Get-all items successful",
      data: result,
    });
  } catch (err) {
    console.log("err", err);
    res.status(400).json({
      status: 400,
      message: "Bad Request",
    });
  }
};

const getItemByPriceRange = async (req, res) => {
  const priceRange = req.params.priceRange;

  const priceOptions = {
    1: (price, item) => {
      if (price < 50) {
        return item;
      }
    },
    2: (price, item) => {
      if (price >= 50 && price <= 100) {
        return item;
      }
    },
    3: (price, item) => {
      if (price >= 100 && price <= 150) {
        return item;
      }
    },
    4: (price, item) => {
      if (price >= 300) {
        return item;
      }
    },
  };

  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("Catalogue");

    const allResult = await db.collection("Items").find().toArray();

    let itemRangeResults = [];
    allResult.forEach((item) => {
      let priceParse = parseInt(item.price.slice(1, item.price.length));
      const itemIncluded = priceOptions[priceRange](priceParse, item);
      if (itemIncluded) {
        itemRangeResults.push(itemIncluded);
      }
    });

    res.status(200).json({
      status: 200,
      message: "Get-all items successful",
      data: itemRangeResults,
    });

    // const queryObject_PriceRange = { price }

    client.close();
    res.status(200).json({
      status: 200,
      message: "Get-all items successful",
      data: itemRangeResults,
    });
  } catch (err) {
    console.log("err", err);
    res.status(400).json({
      status: 400,
      message: "Bad Request",
    });
  }
};


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
    console.log(err);
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

//for finding the businesses from the product names
//db.users.findOne({"username" : {$regex : "son"}});

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
    console.log("err", err);
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
    console.log("err", err);
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

//return company details given the companyId
const getCompany = async (req, res) => {
  try {
    const _id = parseInt(req.params._id);
    const client = new MongoClient(MONGO_URI, options);

    await client.connect();
    const db = client.db("Catalogue");
    const result = await db.collection("Companies").find().toArray();
    result
      ? res.status(200).json({ status: 200, _id, data: result })
      : res.status(404).json({ status: 404, _id, data: "Not Found" });

    client.close();
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
};

const getItemsBySearch = async (req, res) => {
  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("Catalogue");
    const result = await db.collection("Items").find().toArray();

    client.close();

    res.status(200).send({
      status: 200,
      message: "success",
      data: result,
    });
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
};

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
    console.log("err", err);
    res.status(400).json({
      status: 400,
      message: "Bad Request",
    });
  }
};

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
    console.log(err);
    return res.status(400).json({ status: 400, message: "Invalid data!" });
  }
};
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
    console.log("err", err);
    res.status(400).json({
      status: 400,
      message: "Bad Request",
    });
  }
};

module.exports = {
  getAllItems,
  getCompanies,
  getItemById,
  getItemsByCategory,
  getItemsByCompany,
  getItemByBodyLocation,
  getItemByPriceRange,
  getCartItems,
  addCartItem,
  updateCartItem,
  deleteCartItem,
  getSingleOrder,
  getAllOrders,
  createOrder,
  updateOrder,
  deleteOrder,
  getCompany,
  getItemsBySearch,
  getAllUsers,
  createUser,
  getUser,
};
