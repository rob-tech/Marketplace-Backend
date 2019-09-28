const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const productRouter = require("./services/productsMongoose")
const { join } = require("path");
// const productPdfRoutes = require("./services/pdfEmailPost")
// const reviewRoutes = require("./services/reviews")
const cors = require("cors")


const server = express()
server.use("/public", express.static(__dirname + "/public"))
server.use(bodyParser.json())
server.use(cors())
server.use("/products", productRouter)

const psw = process.env.SENDGRID_API_KEY
const email = process.env.EMAIL


// server.use("/reviews", reviewRoutes)

mongoose.connect("mongodb://localhost:27017/Amazon", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(
  server.listen(3000, () => {
  console.log("Server running on port 3000")
}))
.catch(err => console.log(err));