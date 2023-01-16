const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require("uuid");
const moment = require('moment');
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

require("dotenv").config();
const { MONGO_URI } = process.env;

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

//(basically just a get-all-items endpoint ... but used for the search bar)
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
//returns an array of all the companies in the company collection
const getCompanies = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("Catalogue");
    const result = await db.collection("Companies").find().toArray();

    if(result.length === 0){
      res.status(404).json({
        status: 404,
        message: "No companies found",
      })
    }else{
      res.status(200).json({
        status: 200,
        message: "Get all companies successful",
        data: result,
      });
    }
  } catch (err) {
    res.status(400).json({ status: 400, message: "Couldn't get the companies" });
  }
  client.close();
};

module.exports = {
  getCompany,
  getItemsBySearch,
  getCompanies,
};
