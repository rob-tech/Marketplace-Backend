// const express = require("express");
// const idGen = require("shortid");
// const multer = require("multer");
// // const { parse } = require("url")
// const path = require("path");
// const utils = require("./utils");
// const fs = require("fs-extra");

// const router = express.Router();

// getProducts = async () => {
//   // const buffer = fs.readFileSync("products.json")
//   // var file = buffer.toString()
//   // file = JSON.parse(file)
//   // res.send(file)
//   return await getItems("products.json");
// };

// saveProducts = async products => {
//   await saveItems("products.json", products);
//   // await fs.writeFile("products.json", JSON.stringify(products));
// };

// // router.get("/", async (req, res) => {
// // res.send(await getProducts())
// // })

// //http://localhost:3000/products?category=electronics

// router.get("/", async (req, res) => {
//   var products = await getProducts();
//   res.send(
//     products.filter(
//       x =>
//         !req.query.category ||
//         x.category.toLowerCase() == req.query.category.toLowerCase()
//     )
//   );
// });

// router.get("/:id", async (req, res) => {
//   var products = await getProducts();
//   res.send(products.find(product => product.id == req.params.id));
// });

// router.get("/:id/reviews", async (req, res) => {
//   var reviews = await getItems("reviews.json");
//   res.send(reviews.filter(review => review.productId == req.params.id));
// });

// router.post("/", async (req, res) => {
//   var products = await getProducts();
//   var newProduct = req.body;
//   newProduct.createdAt = new Date();
//   newProduct.updatedAt = newProduct.createdAt;
//   newProduct.id = idGen.generate();

//   products.push(newProduct);
//   await saveProducts(products);

//   res.send(newProduct);
// });


// const multerInstance = multer({});

// router.get('/:name/download', (req, res, next)=> {    
//   const {name} = req.params
//       const path = join(studentsFolder, name)  
//       res.setHeader('Content-Disposition', `attachment; filename=myFile.png`)
//       fs.createReadStream(path).on('end', (data) => res.send(data)).on('error', err => next(err))  
//   })

// router.post("/:id/upload", multerInstance.single("pic"), async (req, res) => {
//   //1) save the picture
//   var fullUrl = req.protocol + "://" + req.get("host") + "/public/img/";

//   req.params.id + "." + req.file.originalname.split(".").reverse()[0]

//   var ext = path.extname(req.file.originalname);
//   var productID = req.params.id;
//   var fileName = productID + ext;
//   await fs.writeFile("./public/img/" + fileName, req.file.buffer);

//   //2) update image link
//   var products = await getProducts();
//   var toUpdate = products.find(product => product.id == req.params.id);
//   toUpdate.imageUrl = fullUrl + fileName;
//   await saveProducts(products);

//   res.send(toUpdate);
// });


// router.put("/:id", multerInstance.single("pic"), async (req, res) => {

//   if (req.file) {
//       var fullUrl = req.protocol + "://" + req.get("host") + "/public/img/"
//       req.params.id + "." + req.file.originalname.split(".").reverse()[0]
//       var ext = path.extname(req.file.originalname)
//       var fileName = req.params.id + ext;
//       await fs.writeFile("./public/img/" + fileName, req.file.buffer)

//       var products = await getProducts();
//       var oldProduct = products.find(product => product.id == req.params.id)
//       var newProduct = JSON.parse(req.body.metadata)
//       newProduct.updatedAt = new Date()
//       delete newProduct.id
//       delete newProduct.createdAt
//       Object.assign(oldProduct, newProduct)

//   await saveProducts(products)

//   res.send(oldProduct)
    
//   }
// else {
//   var products = await getProducts();
//       var oldProduct = products.find(product => product.id == req.params.id)
//       var newProduct = req.body
//       newProduct.updatedAt = new Date()
//       delete newProduct.id
//       delete newProduct.createdAt
//       Object.assign(oldProduct, newProduct)

//   await saveProducts(products)

//   res.send(oldProduct)
// }
 
  
// })


///////////////////////////////////////////////////////////////



// router.delete("/:id", (req, res) => {
//   const buffer = fs.readFileSync("products.json")
//   const file = buffer.toString()
//   var allProducts = JSON.parse(file)
//   allProducts = allProducts.filter(product => product.id != req.params.id)
//   fs.writeFileSync("products.json", JSON.stringify(allProducts))
//   res.send(allProducts)
// });

// router.put("/:id", (req, res) => {
//   const buffer = fs.readFileSync("products.json")
//   const file = buffer.toString()
//   var allProducts = JSON.parse(file)
//   var productToReplace = allProducts.find(
//     product => product.id == req.params.id
//   );
//   allProducts = allProducts.filter(
//     product => product.id != productToReplace.id
//   );
//   var editedProduct = req.body
//   editedProduct.id = parseInt(productToReplace.id)
//   editedProduct.createdDate = productToReplace.createdDate
//   editedProduct.updatedDate = new Date()
//   allProducts.push(editedProduct)
//   fs.writeFileSync("products.json", JSON.stringify(allProducts))
//   res.send(allProducts)
// });

///product/{id}/Reviews

module.exports = router;
