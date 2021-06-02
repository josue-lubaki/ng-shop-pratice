const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')

// npm install dotenv
require('dotenv/config')

const api = process.env.API_URL

// Middleware
app.use(express.json())
app.use(morgan('tiny'))

// Le Schema du model
const productSchema = mongoose.Schema({
    name: String,
    image: String,
    countInStock: {
        type: Number,
        required: true,
    },
})

const Product = mongoose.model('Product', productSchema)

// http://localhost:3000/api/v1/products
app.get(`${api}/products`, async (req, res) => {
    const productList = await Product.find()

    if (!productList) {
        res.status(500).json({
            success: false,
        })
    }
    res.send(productList)
})

app.post(`${api}/products`, (req, res) => {
    const product = new Product({
        name: req.body.name,
        image: req.body.image,
        countInStock: req.body.countInStock,
    })

    product
        .save()
        .then((createdProduct) => {
            res.status(201).json(createdProduct)
        })
        .catch((err) => {
            res.status(500).json({
                error: err,
                success: false,
            })
        })
})

// appelé avant le démarrage du server
mongoose
    .connect(process.env.CONNECTION_STRING, {
        useNewUrlParser: true, // Pour lui dire que j'utilise un nouveau ParserJSON @see express.json()
        useUnifiedTopology: true,
        dbName: 'eshop-database',
    })
    .then(() => {
        console.log('Database connection is ready')
    })
    .catch((error) => {
        console.log(error)
    })

app.listen(3000, () => {
    console.log(api)
    console.log('server is running now : http://localhost:3000')
})
