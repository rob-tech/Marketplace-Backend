const express = require("express");
const router = express.Router();
const { parse } = require("url");
const fs = require("fs");
const multer = require("multer");

router.get("/", (req, res) => {
  const buffer = fs.readFileSync("products.json");
  var file = buffer.toString();
  file = JSON.parse(file);
  res.send(file);
});

router.get("/:id", (req, res) => {
  var products = fs.readFileSync("products.json");
  const { id } = req.params;
  var allProducts = JSON.parse(products);
  var productId = allProducts.find(product => product.id == id);
  res.send(productId);
});

router.post("/", (req, res) => {
  var newProduct = req.body;
  var buffer = fs.readFileSync("products.json");
  var allProducts = buffer.toString();
  allProducts = JSON.parse(allProducts);
  newProduct.id = allProducts.length + 1;
  newProduct.createdDate = new Date();
  newProduct.updatedDate = newProduct.createdDate
  allProducts.push(newProduct);
  fs.writeFileSync("products.json", JSON.stringify(allProducts));
  res.send(allProducts);
});

router.delete("/:id", (req, res) => {
  const buffer = fs.readFileSync("products.json");
  const file = buffer.toString();
  var allProducts = JSON.parse(file);
  allProducts = allProducts.filter(product => product.id != req.params.id);
  fs.writeFileSync("products.json", JSON.stringify(allProducts));
  res.send(allProducts);
});

router.put("/:id", (req, res) => {
  const buffer = fs.readFileSync("products.json");
  const file = buffer.toString();
  var allProducts = JSON.parse(file);
  var productToReplace = allProducts.find(
    product => product.id == req.params.id
  );
  allProducts = allProducts.filter(
    product => product.id != productToReplace.id
  );
  var editedProduct = req.body;
  editedProduct.id = parseInt(productToReplace.id);
  editedProduct.createdDate = productToReplace.createdDate
  editedProduct.updatedDate = new Date();
  allProducts.push(editedProduct);
  fs.writeFileSync("products.json", JSON.stringify(allProducts));
  res.send(allProducts);
});

const uploadImage = multer({});

router.post("/:id/upload", uploadImage.single("pic"), (req, res) => {
  var fullUrl = req.protocol + "://" + req.get("host") + "/public/img/";
  var fileName =
    req.params.id + "." + req.file.originalname.split(".").reverse()[0];
  var path = "./public/img/" + fileName;
  fs.writeFileSync(path, req.file.buffer);

  var buffer = fs.readFileSync("products.json");
  var file = buffer.toString();
  var allProducts = JSON.parse(file);
  var product = allProducts.find(
    singleProduct => singleProduct.id == req.params.id
  );
  allProducts.filter(product => product.id != req.params.id);

  product.imageUrl = fullUrl + fileName;

  allProducts.push(product);
  fs.writeFileSync("products.json", JSON.stringify(allProducts));
  res.send(product);
});

router.get("/:id/reviews", (req, res) => {
  const { id } = req.params;
  var reviews = fs.readFileSync("reviews.json");
  var allReviews = JSON.parse(reviews);
  var productReviewId = allReviews.filter(review => review.productId == id);
  res.send(productReviewId)
  console.log(productReviewId)
});

///product/{id}/Reviews

module.exports = router;
