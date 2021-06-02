const mongoose = require('mongoose')

// Le Schema du model
const productSchema = mongoose.Schema({
    name: String,
    image: String,
    countInStock: {
        type: Number,
        required: true,
    },
})

exports.Product = mongoose.model('Product', productSchema)
