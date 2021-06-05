const mongoose = require('mongoose')

// Le Schema du model
const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    icon: {
        type: String,
    },
    color: {
        type: String,
    },
})

exports.Category = mongoose.model('Category', categorySchema)
