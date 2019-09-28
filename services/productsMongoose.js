const express = require("express");
const {ObjectID} = require('mongodb')
const productSchema = require('./schema')
// const mongoServerURL = 'mongodb://localhost:27017'

const router = express.Router();

router.get("/", async (req, res) => {
  try{
    const products = await productSchema.find({})
    res.send(products) 
   } catch (error) {
    console.log(error)
   }
})

router.get("/:id", async (req, res) => {
  try {
    const product = await productSchema.findById(req.params.id);
    res.send(product)
  } catch (error) {
    res.send("id not found")
  }
})

router.post("/", async (req, res) => {
try{
  const newProduct = new productSchema(req.body)
  const {_id} = await newProduct.save()
  res.send(_id)
} catch (error) {
  res.send(error)
}
})

router.put("/:id", async (req, res) => {
  try {
    const product = await productSchema.findByIdAndUpdate(req.params.id, req.body)
    req.body.updatedDate = Date.now()
    res.send(product)
} catch (error) {
  console.log(error)
}
})

router.delete("/:id", async (req, res) => {
  try {
    const product = await productSchema.findByIdAndDelete(req.params.id)
    res.send(product)
} catch (error) {
  console.log(error)
}
})

////Reviews///////

router.get("/:id/reviews", async (req, res) => {
  try {
    const reviews = await productSchema.findById(req.params.id, {reviews: [{}]});
    res.send(reviews)
  } catch (error) {
    res.send("id not found")
    console.log(error)
  }
})

router.post("/:id/reviews", async (req, res) => {
  try {
    const review = await productSchema.findByIdAndUpdate(req.params.id, {$push: {reviews: req.body}});
    res.send(review)
  } catch (error) {
    res.send("id not found")
    console.log(error)
  }
})

router.put("/:id/reviews/:reviewId", async (req, res) => {
  try {
    var modification = req.body
    await productSchema.findById(req.params.id, {reviews: {id: new ObjectID(req.params.reviewId)}})
    const modReview = await productSchema.updateOne(req.params.id, {"reviews.id": new ObjectID(req.params.reviewId)}, { $set: {reviews: modification }})
    console.log(modReview)
    res.send(modReview)
  } catch (error) {
    res.send("id not found")
    console.log(error)
  }
})
// router.put("/:id/reviews/:reviewId", async (req, res) => {
//   try {
//     const mongo = await MongoClient.connect(mongoServerURL, {
//       useNewUrlParser: true
//     })
//     const collection = mongo.db("Amazon").collection("Products")
//     var modification = req.body
//     const review = await collection.findOne({ _id: new ObjectID(req.params.id), reviews: {id: new ObjectID(req.params.reviewId)}})
//     const modreview = await collection.updateOne({_id: new ObjectID(req.params.id), "reviews.id": new ObjectID(req.params.reviewId)}, { $set: {reviews: modification }})
//     console.log(modreview)
//     res.send(modreview)
//   } catch (error) {
//     res.send(error)
//     console.log(error)
//   }
// })

// router.delete("/:id/reviews/:reviewId", async (req, res) => {
//   try {
//     const review = await productSchema.findByIdAndDelete(req.params.id, { $set: {reviews: modification }});
//     res.send(modReview)
//   } catch (error) {
//     res.send("id not found")
//     console.log(error)
//   }
// })


module.exports = router