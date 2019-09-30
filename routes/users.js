const Joi = require('joi')
const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()

const { User, validate } = require('../models/User')

// endpoints
router.post('/', async (req, res) => {
    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    let user = await User.findOne({ email: req.body.email })
    if (user) return res.status(400).send("Email already exists!")

    user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })

    await user.save()
    res.status(200).send(user)

})

module.exports = router