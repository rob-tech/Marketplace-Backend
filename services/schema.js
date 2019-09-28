const { Schema} = require("mongoose")
const mongoose = require("mongoose")
const validator = require("validator")

const reviewSchema = new Schema({
    _id: {type: Schema.Types.ObjectId, auto: true},
    comment: String,
    rating: Number,
    creationDate: Date
})
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
    creationDate: { 
        type: Date, 
        default: Date.now 
    },
    updatedDate: { 
        type: Date, 
        default: Date.now 
    },

    reviews: [reviewSchema]
})

module.exports = mongoose.model('product', productSchema)