const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")

const productRoutes = require("./services/products")
// const reviewRoutes = require("./services/reviews")

const server = express()
server.use("/public", express.static(__dirname + "/public"))

server.use(cors())
server.use(bodyParser.json())

server.use("/products", productRoutes)
// server.use("/reviews", reviewRoutes)


server.listen(3000, () => {
  console.log("Server running on port 3000")
})
