const express = require("express");
const idGen = require("shortid");
const { MongoClient, ObjectID } = require('mongodb')
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
    var modification = req.body
    var newProduct = await collection.updateOne({_id: new ObjectID(req.params.id) }, { $set: modification })
    console.log(newProduct)
    res.send(modification)
  } catch (error) {
    res.send(error)
    console.log(error)
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

///////REVIEWS////////////

router.get("/:id/reviews", async (req, res) => {
  try {
    const product = await getProducts({ _id: new ObjectID(req.params.id) });
    var review = product[0].reviews
    res.send(review)
  } catch (error) {
    res.send("id not found")
    console.log(error)
  }
})

router.post("/:id/reviews", async (req, res) => {
  try {
    const mongo = await MongoClient.connect(mongoServerURL, {
      useNewUrlParser: true
    })
    const collection = mongo.db("Amazon").collection("Products")
    req.body.id = new ObjectID();
    const review = await collection.updateOne({ _id: new ObjectID(req.params.id)}, {$push: {reviews: req.body}} )
    res.send(review)    
  } catch (error) {
    res.send(error)
  }
})

router.delete("/:id/reviews/:reviewId", async (req, res) => {
  try {
    const mongo = await MongoClient.connect(mongoServerURL, {
      useNewUrlParser: true
    })
    const collection = mongo.db("Amazon").collection("Products")
    console.log(collection)
    const review = await collection.updateOne({ _id: new ObjectID(req.params.id)}, {$pull: {reviews: { id: new ObjectID(req.params.reviewId)} } } )
    console.log(review)
    res.send( "OK" )    
  } catch (error) {
    console.log(error)
  }
})


router.put("/:id/reviews/:reviewId", async (req, res) => {
  try {
    const mongo = await MongoClient.connect(mongoServerURL, {
      useNewUrlParser: true
    })
    const collection = mongo.db("Amazon").collection("Products")
    var modification = req.body
    const review = await collection.findOne({ _id: new ObjectID(req.params.id)}, {reviews: {id: new ObjectID(req.params.reviewId)}})
    modification.id = new ObjectID(req.params.reviewId)
    const modreview = await collection.updateOne({"reviews.id": new ObjectID(req.params.reviewId)}, { $set: {"reviews.$": modification}})
    console.log(modreview)
    res.send(modreview)
  } catch (error) {
    res.send(error)
    console.log(error)
  }
})




module.exports = router;