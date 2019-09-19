const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")

const productRoutes = require("./services/products")
const productPdfRoutes = require("./services/pdfEmailPost")
// const reviewRoutes = require("./services/reviews")

const server = express()

const psw = process.env.SENDGRID_API_KEY
const email = process.env.EMAIL

server.use("/public", express.static(__dirname + "/public"))

server.use(cors())
server.use(bodyParser.json())

server.use("/products", productRoutes, productPdfRoutes)
// server.use("/reviews", reviewRoutes)


server.listen(3000, () => {
  console.log("Server running on port 3000")
})
