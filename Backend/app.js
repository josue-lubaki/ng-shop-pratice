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

// http://localhost:3000/api/v1/products
app.get(`${api}/products`, (req, res) => {
    const product = {
        id: 1,
        name: 'hair dresser',
        image: 'some url',
    }
    res.send(product)
})

app.post(`${api}/products`, (req, res) => {
    const newProduct = req.body
    console.log(newProduct)
    res.send(newProduct)
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
