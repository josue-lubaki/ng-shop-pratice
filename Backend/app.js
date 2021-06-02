const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')

// npm install dotenv
require('dotenv/config')

// Middleware
app.use(express.json())
app.use(morgan('tiny'))

// Routers
const categoriesRoutes = require('./routes/categories.js')
const productsRoutes = require('./routes/products')
const usersRoutes = require('./routes/users')
const ordersRoutes = require('./routes/orders')

const api = process.env.API_URL

app.use(`${api}/categories`, productsRoutes)
app.use(`${api}/products`, productsRoutes)
app.use(`${api}/users`, productsRoutes)
app.use(`${api}/orders`, productsRoutes)

// appelé avant le démarrage du server
mongoose
    .connect(process.env.CONNECTION_STRING, {
        useNewUrlParser: true, // Pour lui dire que j'utilise un nouveau ParserJSON @see express.json()
        useUnifiedTopology: true,
        dbName: 'shop-database',
    })
    .then(() => {
        console.log('Database connection is ready')
    })
    .catch((error) => {
        console.log(error)
    })

app.listen(3000, () => {
    console.log('server is running now : http://localhost:3000')
})
