const express = require("express")
const bodyParser = require("body-parser")
const productRoutes = require("./index.js")
const server = express()
const cors = require("cors")


server.use(bodyParser.json())

server.use("/", productRoutes)


server.use("/public", express.static(__dirname + "/public"))

server.use(cors())

server.listen(3000, () => {
  console.log("Server running on port 3000")
})
