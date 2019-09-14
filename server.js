const express = require("express")
const bodyParser = require("body-parser")
const productRoutes = require("./services/products.js")
const reviewRoutes = require("./services/reviews.js")
const server = express()
const cors = require("cors")

server.use(cors())

server.use(bodyParser.json())

server.use("/products", productRoutes)
server.use("/reviews", reviewRoutes)


server.use("/public", express.static(__dirname + "/public"))



server.listen(3000, () => {
  console.log("Server running on port 3000")
})
