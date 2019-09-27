const express = require("express");
const idGen = require("shortid");
const { MongoClient, ObjectID} = require('mongodb')
// const productschema = require('./schema')

const mongoServerURL = 'mongodb://localhost:27017'

getProducts = async (filter = {}) => {
    try {
      const mongo = await MongoClient.connect(mongoServerURL, {
        useNewUrlParser: true
      })
      const collection = mongo.db("Amazon").collection("Products")
      const products = collection.find(filter).toArray()
      return products ? products : []
    } catch (error) {
      console.log(error)
    }
  }
  
  const router = express.Router();

  router.get("/", async (req, res) => {
    const products = await getProducts(req.query);
    res.send(products)
  })

  router.get("/:id", async (req, res) => {
    try {
      const products = await getProducts({ _id: new ObjectID(req.params.id) });
      res.send(products)
    } catch (error) {
      res.send("id not found")
    }
  })

  router.post("/", async (req, res) => {
    try {
      const mongo = await MongoClient.connect(mongoServerURL, {
        useNewUrlParser: true
      })
      const collection = mongo.db("Amazon").collection("Products")
      req.body.creationDate = new Date()
      req.body.updatedDate = req.body.creationDate
      const { insertedId } = await collection.insertOne(req.body)
      res.send(insertedId)
    } catch (error) {
      res.send(error)
    }
  })

  router.put("/:id", async (req, res) => {
    try {
        const mongo = await MongoClient.connect(mongoServerURL, {
          useNewUrlParser: true
        })
    
        const collection = mongo.db("Amazon").collection("Products")
    
        const { modifiedCount } = await collection.updateOne({ _id: req.params.id })

    
        if (modifiedCount > 0) {
          res.send('OK')
        } else {
          res.send('NOTHING TO MODIFY')
        }
    
      } catch (error) {
    console.log
      }
  })
  
  router.delete("/:id", async (req, res) => {
    try {
      const mongo = await MongoClient.connect(mongoServerURL, {
        useNewUrlParser: true
      })
      const collection = mongo.db("Amazon").collection("Products")
      const { deletedCount } = await collection.deleteOne({ _id: new ObjectID(req.params.id) });
      if (deletedCount > 0) {
        res.send('OK')
      } else {
        res.send('ID not found')
      }
    } catch (error) {
    }
  })


  module.exports = router;