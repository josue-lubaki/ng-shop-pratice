const { Product } = require('../models/product')
const { Category } = require('../models/category')
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const multer = require('multer')

// contient les extensions dont nous souhaitons supportées
const FILE_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg',
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const isValidFile = FILE_TYPE_MAP[file.mimetype]
        let uploadError = new Error('Invalid image type')

        if (isValidFile) {
            uploadError = null
        }
        cb(uploadError, 'public/uploads')
    },
    filename: function (req, file, cb) {
        const fileName = file.originalname.split(' ').join('-')
        const extension = FILE_TYPE_MAP[file.mimetype]
        cb(null, `${fileName}-${Date.now()}.${extension}`)
    },
})

const uploadOptions = multer({ storage: storage })

/**
 * Récupération de tous les produits
 * @see http://localhost:3000/api/v1/products
 */
router.get(`/`, async (req, res) => {
    let filter = {}
    if (req.query.categories) {
        filter = { category: req.query.categories.split(',') }
    }

    const productList = await Product.find(filter).populate('category')

    if (!productList) {
        res.status(500).json({
            success: false,
        })
    }
    res.send(productList)
})

/**
 * Récupération d'un produit grâce à son ID
 *
 */
router.get('/:id', async (req, res) => {
    const product = await Product.findById(req.params.id).populate('category')

    if (!product) {
        res.status(500).json({
            success: false,
        })
    }
    res.send(product)
})

/**
 * Création d'un produit dans la collection Product
 * @method findById()
 * @method single(fieldNameModel)
 * @see http://localhost:3000/api/v1/products
 */
router.post(`/`, uploadOptions.single('image'), async (req, res) => {
    // Vérifier l'existence de la catgorie avant de créer un produit
    const category = await Category.findById(req.body.category)
    if (!category) {
        return res.status(400).send('invalid Category')
    }

    const fileName = req.file.filename
    const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`

    let product = new Product({
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: `${basePath}${fileName}`, // http://localhost:3000/public/uploads/image-2323232.jpeg
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeatured: req.body.isFeatured,
    })

    product = await product.save()

    if (!product) {
        return res.status(500).send('The product cannot be craeted')
    }

    res.send(product)
})

/**
 * Mettre à jour un produit via son ID
 * @method findByIdAndUpdate()
 * @method isValidObjectId()
 * @see {new : true} : pour demander le renvoi de la nouvelle mise à jour et non l'ancienne
 */
router.put('/:id', async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).send('Invalid Produit Id')
    }

    // Vérifier l'existence de la catgorie avant de mettre à jour un produit
    const category = await Category.findById(req.body.category)
    if (!category) {
        return res.status(400).send('invalid Category')
    }

    const product = await Product.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            description: req.body.description,
            richDescription: req.body.richDescription,
            image: req.body.image,
            brand: req.body.brand,
            price: req.body.price,
            category: req.body.category,
            countInStock: req.body.countInStock,
            rating: req.body.rating,
            numReviews: req.body.numReviews,
            isFeatured: req.body.isFeatured,
        },
        { new: true }
    )

    if (!product) {
        return res.status(400).send('the product cannot be updated')
    }

    res.send(product)
})

/**
 * Suppression d'un produit via son ID
 */
router.delete(`/:id`, async (req, res) => {
    Product.findByIdAndDelete(req.params.id)
        .then((product) => {
            if (product)
                return res.status(200).json({
                    success: true,
                    message: 'The product is deleted',
                })
            else {
                return res.status(404).json({
                    success: false,
                    message: 'product not found !',
                })
            }
        })
        .catch((err) => {
            return res.status(400).json({
                success: false,
                error: err,
            })
        })
})

/**
 * Methode qui permet de calculer le nombre des Products dans la collections Products
 * @method countDocuments()
 * @see http://localhost:3000/api/v1/products/get/count
 */
router.get('/get/count', async (req, res) => {
    const productCount = await Product.countDocuments((count) => count)

    if (!productCount) {
        res.status(500).json({
            success: false,
        })
    }
    res.send({
        productCount: productCount,
    })
})

/**
 * Récuperer tous les produits ayant le champ "Featured" à true
 * @method find()
 * @see http://localhost:3000/api/v1/products/get/featured/[:count]
 *
 * Récupérer un nombre fixe des produits featured, le nombre passé en paramètre
 * @see +count : caster le type de la variable en Number (Raison du +)
 */
router.get('/get/featured/:count', async (req, res) => {
    const count = req.params.count ? req.params.count : 0
    const products = await Product.find({ isFeatured: true }).limit(+count)

    if (!products) {
        res.status(500).json({
            success: false,
        })
    }
    res.send(products)
})

module.exports = router
