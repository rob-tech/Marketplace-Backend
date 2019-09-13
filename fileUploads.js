// const express = require("express");
// const router = express.Router();
// const multer = require("multer");
// const { join } = require("path");
// const fs = require("fs");
// const { parse } = require("url");


// const uploadImage = multer({});

// router.post("/:id/upload", uploadImage.single("pic"), (req, res) => {
//     var fullUrl = req.protocol + "://" + req.get("host") + "/public/img/";
//     var fileName =  req.params.id + "." + req.file.originalname.split(".").reverse()[0]
//     var path = "./public/img/" + fileName
//     fs.writeFile(path, req.file.buffer)

//     var buffer = fs.readFileSync("products.json")
//     var file = buffer.toString()
//     var allProducts = JSON.parse(file)
//     var product = allProducts.find(singleProduct => singleProduct.id == req.params.id);
//     allProducts.filter(product => product.id != req.params.id)

//     product.imageUrl = fullUrl + fileName

//     allProducts.push(product)
//     fs.writeFileSync("products.json", JSON.stringify(allProducts))
//     res.send(product);
// });

// module.exports = router;
