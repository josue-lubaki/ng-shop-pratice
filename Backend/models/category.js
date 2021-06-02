const mongoose = require('mongoose')

// Le Schema du model
const categorySchema = mongoose.Schema({})

exports.Category = mongoose.model('Category', categorySchema)
