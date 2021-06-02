const mongoose = require('mongoose')

// Le Schema du model
const orderSchema = mongoose.Schema({})

exports.Order = mongoose.model('Order', orderSchema)
