const { Order } = require('../models/order')
const { OrderItem } = require('../models/order-item')
const express = require('express')
const router = express.Router()

/**
 * Récupération de toutes les commandes d'achat de la collection Orders
 * @see name of user object
 * @see order sorted by dateOrdered
 */
router.get(`/`, async (req, res) => {
    const orderList = await Order.find()
        .populate('user', 'name')
        .sort({ dateOrdered: -1 })

    if (!orderList) {
        res.status(500).json({
            success: false,
        })
    }
    res.send(orderList)
})

/**
 * Récupération d'une seule commande de la collection Orders
 * @see populate -> user{name} ; orderItems ; product ; category
 */
router.get(`/:id`, async (req, res) => {
    const order = await Order.findById(req.params.id)
        .populate('user', 'name')
        .populate({
            path: 'orderItems',
            populate: { path: 'product', populate: 'category' },
        })

    if (!order) {
        res.status(500).json({
            success: false,
        })
    }
    res.send(order)
})

/**
 * Création d'une nouvelle Category dans la collection catégories
 * @method save()
 * @method send()
 * @see /api/v1/orders
 */
router.post('/', async (req, res) => {
    const orderItemIds = Promise.all(
        req.body.orderItems.map(async (orderItem) => {
            let newOrderItem = new OrderItem({
                quantity: orderItem.quantity,
                product: orderItem.product,
            })

            newOrderItem = await newOrderItem.save()
            return newOrderItem._id
        })
    )
    const orderItemsIdsResolved = await orderItemIds

    console.log(orderItemsIdsResolved)

    let order = new Order({
        orderItems: orderItemsIdsResolved,
        shippingAddress1: req.body.shippingAddress1,
        shippingAddress2: req.body.shippingAddress2,
        city: req.body.city,
        zip: req.body.zip,
        country: req.body.country,
        phone: req.body.phone,
        status: req.body.status,
        totalPrice: req.body.totalPrice,
        user: req.body.user,
    })

    order = await order.save()

    if (!order) {
        return res.status(404).send('the order cannot be created')
    }

    res.send(order)
})

/**
 * Mettre à jour le status d'une commande via son ID
 * @method findByIdAndUpdate()
 * @method isValidObjectId()
 * @see {new : true} : pour demander le renvoi de la nouvelle mise à jour et non l'ancienne
 */
router.put('/:id', async (req, res) => {
    const order = await Order.findByIdAndUpdate(
        req.params.id,
        {
            status: req.body.status,
        },
        { new: true }
    )

    if (!order) {
        return res.status(400).send('the order cannot be update')
    }

    res.send(order)
})

/**
 * Suppression d'une commande dans la collection Categories
 * @method findByIdAndDelete()
 * @see /api/v1/orders/:id
 * @see orderItem les ID contenus dans le tableau OrderItems[]
 */
router.delete('/:id', async (req, res) => {
    Order.findByIdAndDelete(req.params.id)
        .then(async (order) => {
            if (order) {
                await order.orderItems.map(async (orderItem) => {
                    await OrderItem.findByIdAndDelete(orderItem)
                })
                return res.status(200).json({
                    success: true,
                    message: 'The order is deleted',
                })
            } else {
                return res.status(404).json({
                    success: false,
                    message: 'order not found !',
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

module.exports = router
