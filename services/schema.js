const { Schema} = require("mongoose")
const mongoose = require("mongoose")
const validator = require("validator")

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    Projects:  [{
    _id: {type: Schema.Types.ObjectId, auto: true},
    Name: String,
    Description: String,
    CreationDate: Date,
    repoURL: String,
    LiveURL: String
    }]
})

module.exports = mongoose.model('Student', studentSchema)