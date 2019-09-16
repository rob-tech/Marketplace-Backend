// const express = require("express")
// const router = express.Router()
// const { parse } = require("url");
// const fs = require("fs-extra")
// const idGen = require('shortid')

// router.get("/", (req, res) => {
//     const buffer = fs.readFileSync("reviews.json")
//     var file = buffer.toString()
//     file = JSON.parse(file)
//     res.send(file)
//   });

//   router.get("/:id", (req, res) => {
//     var reviews = fs.readFileSync("reviews.json")
//     const { id } = req.params
//     var allReviews = JSON.parse(reviews)
//     var reviewId = allReviews.find(review => review.id == id)
//     res.send(reviewId);
//   });

//   router.post("/", (req, res) => {
//     var newReview = req.body
//     var buffer = fs.readFileSync("reviews.json")
//     var allReviews = buffer.toString()
//     allReviews = JSON.parse(allReviews)
//     newReview.id = allReviews.length + 1
//     newReview.createdDate = new Date()
//     allReviews.push(newReview)
//     fs.writeFileSync("reviews.json", JSON.stringify(allReviews))
//     res.send(allReviews)
// })

// router.put("/:id", (req, res) => {
//   const buffer = fs.readFileSync("reviews.json")
//   const file = buffer.toString()
//   var allReviews = JSON.parse(file);
//   var reviewToReplace = allReviews.find(
//     review =>  review.id == req.params.id
//   );
//   allReviews = allReviews.filter(
//     review =>  review.id != reviewToReplace.id
//   );
//   var editedReview = req.body
//   editedReview.id = parseInt(reviewToReplace.id)
//   editedReview.createdDate = reviewToReplace.createdDate
//   allReviews.push(editedReview);
//   fs.writeFileSync("reviews.json", JSON.stringify(allReviews))
//   res.send(allReviews);
// });


// router.delete("/:id", (req, res) => {
//   const buffer = fs.readFileSync("reviews.json")
//   const file = buffer.toString()
//   var allReviews = JSON.parse(file)
//   allReviews  = allReviews .filter(review => review.id != req.params.id)
//   fs.writeFileSync("reviews.json", JSON.stringify(allReviews ))
//   res.send(allReviews )
// });

// module.exports = router