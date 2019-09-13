const express = require("express")
const router = express.Router()
const { parse } = require("url");
const fs = require("fs")
const multer = require("multer");


router.get("/", (req, res) => {
  const buffer = fs.readFileSync("products.json");
  var file = buffer.toString()
  file = JSON.parse(file)
  res.send(file)
});


router.post("/", (req, res) => {
    var newProduct = req.body
    var buffer = fs.readFileSync("products.json")
    var allProducts = buffer.toString()
    allProducts = JSON.parse(allProducts)
    newProduct.id = allProducts.length + 1
    newProduct.createdDate = new Date()
    allProducts.push(newProduct)
    fs.writeFileSync("products.json", JSON.stringify(allProducts))
    res.send(allProducts)
})


router.delete("/:id", (req, res) => {
  const buffer = fs.readFileSync("products.json")
  const file = buffer.toString()
  var allProducts = JSON.parse(file)
  allProducts = allProducts.filter(product => product.id != req.params.id)
  fs.writeFileSync("products.json", JSON.stringify(allProducts))
  res.send(allProducts)
});

router.put("/:id", (req, res) => {
  const buffer = fs.readFileSync("products.json")
  const file = buffer.toString();
  var allProducts = JSON.parse(file) 
  allProducts = allProducts.filter(product => product.id != req.params.id)
  var product = req.body
  product.id = req.params.id
  product.updatedDate = new Date()
  allProducts.push(product)
  fs.writeFileSync("products.json", JSON.stringify(allProducts))
  res.send(allProducts)
});

const uploadImage = multer({});

router.post("/:id/upload", uploadImage.single("pic"), (req, res) => {
    var fullUrl = req.protocol + "://" + req.get("host") + "/public/img/";
    var fileName =  req.params.id + "." + req.file.originalname.split(".").reverse()[0];
    var path = "./public/img/" + fileName
    fs.writeFileSync(path, req.file.buffer)

    var buffer = fs.readFileSync("products.json")
    var file = buffer.toString()
    var allProducts = JSON.parse(file)
    var product = allProducts.find(singleProduct => singleProduct.id == req.params.id);
    allProducts.filter(product => product.id != req.params.id)

    product.imageUrl = fullUrl + fileName

    allProducts.push(product)
    fs.writeFileSync("products.json", JSON.stringify(allProducts))
    res.send(product);
});

module.exports = router