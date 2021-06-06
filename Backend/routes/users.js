const { User } = require('../models/user')
const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')

/**
 * Récupération de tous les Utilisateurs
 * @method find()
 * @see http://localhost:3000/api/v1/users
 */
router.get(`/`, async (req, res) => {
    const userList = await User.find().select('-passwordHash')

    if (!userList) {
        res.status(500).json({
            success: false,
        })
    }
    res.send(userList)
})

/**
 * Récupération d'un Utilisateur grâce à son ID
 * @see http://localhost:3000/api/v1/users/[:id]
 */
router.get('/:id', async (req, res) => {
    const user = await User.findById(req.params.id).select('-passwordHash')

    if (!user) {
        res.status(500).json({
            success: false,
            message: 'The user with the given ID was not found',
        })
    }
    res.status(200).send(user)
})

/**
 * Création d'un Utilisateur
 * @method findById()
 * @see http://localhost:3000/api/v1/users
 */
router.post(`/`, async (req, res) => {
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        passwordHash: bcrypt.hashSync(req.body.passwordHash, 10),
        phone: req.body.phone,
        isAdmin: req.body.isAdmin,
        street: req.body.street,
        apartement: req.body.apartement,
        zip: req.body.zip,
        city: req.body.city,
        country: req.body.country,
    })

    user = await user.save()

    if (!user) {
        return res.status(400).send('The user cannot be created !')
    }

    res.send(user)
})

/**
 * Mise à jour des informations de l'Utilisateur
 */
router.put('/:id', async (req, res) => {
    // Vérifier l'existence de l'Utilisateur
    const userExist = await User.findById(req.params.id)
    let newPasswordHash
    if (req.body.password) {
        newPasswordHash = bcrypt.hashSync(req.body.password, 10)
    } else {
        newPasswordHash = userExist.passwordHash
    }

    const user = await User.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            email: req.body.email,
            passwordHash: newPasswordHash,
            phone: req.body.phone,
            isAdmin: req.body.isAdmin,
            street: req.body.street,
            apartement: req.body.apartement,
            zip: req.body.zip,
            city: req.body.city,
            country: req.body.country,
        },
        { new: true }
    )
    if (!user) {
        return res.status(400).send('The user cannot be update !')
    }
    res.send(user)
})

module.exports = router
