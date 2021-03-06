const Joi = require('joi')
const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()

const { Genre, validate } = require('../models/Genre')
const auth = require('../middlewares/auth')
const admin = require('../middlewares/admin')
const asyncMiddleware = require('../middlewares/async')
const validateObjectId = require('../middlewares/validateObjectId')

// endpoints
router.get('/', asyncMiddleware(async (req, res, next) => {
    const genres = await Genre.find().sort('name')
    res.status(200).json({
        genres: genres
    })
}))

router.get('/:id', validateObjectId, asyncMiddleware(async (req, res) => {

    const genre = await Genre.findById(req.params.id)

    if (!genre) {
        return res.status(404).json({
            message: "Genre does not exist!"
        })
    }

    res.status(200).json({
        genres: genres
    })
}))

router.post('/', auth, asyncMiddleware(async (req, res) => {
    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const genre = new Genre({
        name: req.body.name
    })

    await genre.save()
    res.status(201).json({
        message: "Genre created successfully!",
        genre: genre
    })
}))

router.put('/:id', auth, asyncMiddleware(async (req, res) => {
    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const genre = await Genre.findByIdAndUpdate(req.params.id, {
        name: req.body.name
    }, { new: true })

    if (!genre) {
        return res.status(404).json({
            message: "Genre does not exist!"
        })
    }

    res.status(200).json({
        message: "Genre updated successfully!",
        genre: genre
    })
}))

router.delete('/:id', [auth, admin], asyncMiddleware(async (req, res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id)

    if (!genre) {
        return res.status(404).json({
            message: "Genre does not exist!"
        })
    }

    res.status(200).json({
        message: "Genre deleted successfully!"
    })
}))


module.exports = router