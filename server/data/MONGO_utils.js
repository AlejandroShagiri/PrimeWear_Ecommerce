


const { MongoClient } = require('mongodb');

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

require("dotenv").config()
const { MONGO_URI } = process.env


const companies = require('./data/companies.json')
const items = require('./data/items.json')


// import myJson from './data/companies.json' assert {type: 'json'};


const batchImportData = async () => {

    try{

        const client = new MongoClient(MONGO_URI, options)
        await client.connect()

        const db = client.db("Catalogue")

        // const result = await db.collection("Items").find().toArray()
        // const result = await db.collection("Items").insertMany(items)
        // const result = await db.collection("Companies").insertMany(companies)


        client.close()


    }catch(err){
        console.log('err', err);

    }
}

module.exports = { batchImportData }