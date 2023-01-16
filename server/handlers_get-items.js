const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require("uuid");
const moment = require('moment');
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

require("dotenv").config();
const { MONGO_URI } = process.env;

//Returns an array of all the items in the items collection in MongoDB
const getAllItems = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("Catalogue");
    const result = await db.collection("Items").find().toArray();

    client.close();
    if(result.length === 0){
      res.status(404).json({
        status: 404,
        message: "No items found",
      })
    }else{
      res.status(200).json({
        status: 200,
        message: "Get-all items successful",
        data: result,
      });
    }
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: "Bad Request",
    });
  }
};

//Returns an array of the single item found in MongoDB
const getItemById = async (req, res) => {
  const id = req.params.id;

  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("Catalogue");

    const queryObject_Id = { _id: parseInt(id) };
    const result = await db.collection("Items").find(queryObject_Id).toArray();

    client.close();
    if(result.length === 0){
      res.status(404).json({
        status: 404,
        message: "No items found",
      })
    }else{
      res.status(200).json({
        status: 200,
        message: "Get item by id successful",
        data: result,
      });
    }
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: "Bad Request",
    });
  }
};

//Returns an array of all items filtered by category 
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
    if(result.length === 0){
      res.status(404).json({
        status: 404,
        message: "No items found",
      })
    }else{
      res.status(200).json({
        status: 200,
        message: "Get item by id successful",
        data: result,
      });
    }
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: "Bad Request",
    });
  }
};

//Returns an array of all items filtered by company name
  //this function first queries the companies collection and then uses
    //the id from the returned object to query the items collection  
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
    if(itemResult.length === 0){
      res.status(404).json({
        status: 404,
        message: "No items found",
      })
    }else{
      res.status(200).json({
        status: 200,
        message: "Get items by company successful",
        data: itemResult,
      });
    }
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: "Bad Request",
    });
  }
};

//Returns an array of all items filtered by body Location 
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
    if(result.length === 0){
      res.status(404).json({
        status: 404,
        message: "No items found",
      })
    }else{
      res.status(200).json({
        status: 200,
        message: `Get items by category succesful`,
        data: result,
      });
    }
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: "Bad Request",
    });
  }
};

//Returns an array of all items filtered by price ranges
  // 1) 0-49.99
  // 2) 50-99.99
  // 3) 100-149.99
  // 4) 150 -> ...
const getItemByPriceRange = async (req, res) => {
  const priceRange = req.params.priceRange;

  if(([1,2,3,4].includes(parseInt(priceRange)) === false)){
  
    res.status(400).json({
      status: 400,
      message: `Bad Request - price range bucket ${priceRange} unknown`
    })
  }else{

    const priceOptions = {
      1: (price, item) => {
        if (price < 50) {
          return item;
        }
      },
      2: (price, item) => {
        if (price >= 50 && price < 100) {
          return item;
        }
      },
      3: (price, item) => {
        if (price >= 100 && price < 150) {
          return item;
        }
      },
      4: (price, item) => {
        if (price >= 150) {
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
      // const queryObject_PriceRange = { price }
  
      client.close();
      if(itemRangeResults.length === 0){
        res.status(404).json({
          status: 404,
          message: "No items found",
        })
      }else{
        res.status(200).json({
          status: 200,
          message: "Get item by id successful",
          data: itemRangeResults,
        });
      }
    } catch (err) {
      res.status(400).json({
        status: 400,
        message: "Bad Request",
      });
    }
  }
};


module.exports = {
  getAllItems,
  getItemById,
  getItemsByCategory,
  getItemsByCompany,
  getItemByBodyLocation,
  getItemByPriceRange,
};
