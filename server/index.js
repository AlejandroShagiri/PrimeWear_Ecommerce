"use strict";

const express = require("express");
const morgan = require("morgan");

const PORT = 4000;

//handlers for each category 
const {
  getAllItems,
  getItemById,
  getItemsByCategory,
  getItemsByCompany,
  getItemByBodyLocation,
  getItemByPriceRange,
} = require("./handlers_get-items.js");

const {
  getCartItems,
  addCartItem,
  updateCartItem,
  deleteCartItem,
  deleteAllCart,
} = require("./handlers_cart.js");

const {
  getSingleOrder,
  getAllOrders,
  createOrder,
  updateOrder,
  deleteOrder,
} = require("./handlers_orders.js");

const {
  getCompany,
  getItemsBySearch,
  getCompanies,
} = require("./handlers_misc.js");

const {
  getAllUsers,
  createUser,
  getUser,
} = require("./handlers_users.js");

express()
  .use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, HEAD, GET, PUT, POST, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("tiny"))
  .use(express.static("./server/assets"))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))


  //endpoints
  .get("/api/get-items", getAllItems)
  .get("/api/get-companies", getCompanies)

  .get("/api/get-items/id/:id", getItemById)
  .get("/api/get-items/category/:category", getItemsByCategory)
  .get("/api/get-items/company/:company", getItemsByCompany)
  .get("/api/get-items/body-location/:bodyLocation", getItemByBodyLocation)
  .get("/api/get-items/price-range/:priceRange", getItemByPriceRange)

  .get("/api/cart/:userId", getCartItems)
  .post("/api/cart", addCartItem)
  .patch("/api/cart/:userId", updateCartItem)
  .delete("/api/cart/:userId", deleteCartItem)
  .delete("/api/carts/:userId", deleteAllCart)

  .get("/api/orders", getAllOrders)
  .get("/api/order/:orderId", getSingleOrder)
  .post("/api/order", createOrder)
  .patch("/api/order/:orderId", updateOrder)
  .delete("/api/order/:orderId", deleteOrder)

  .get("/api/users", getAllUsers)
  .post("/api/user", createUser)
  .get("/api/user/:userName", getUser)

  .get("/api/search", getItemsBySearch)
  .get("/api/get-company/:_id", getCompany)

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
