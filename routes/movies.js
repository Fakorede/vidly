const Joi = require('joi')
const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()

const { Movie, validate } = require('../models/Movie')
const { Genre } = require('../models/Genre')

// endpoints
router.get('/', async (req, res) => {
    const movies = await Movie.find().sort('name')
    res.status(200).send(movies)
})

router.get('/:id', async (req, res) => {
    const genre = await Genre.findById(req.params.id)

    if (!genre) {
        return res.status(404).json({
            message: "Genre does not exist!"
        })
    }

    res.status(200).json({
        genres: genres
    })
})

router.post('/', async (req, res) => {
    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const genre = await Genre.findById(req.body.genreId)
    if (!genre) return res.status(404).send("Invalid Genre!")

    const movie = new Movie({
        title: req.body.title,
        genre: {
            _id: genreId,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    })

    await movie.save()
    res.status(201).send(movie)
})

router.put('/:id', async (req, res) => {
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
})

router.delete('/:id', async (req, res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id)

    if (!genre) {
        return res.status(404).json({
            message: "Genre does not exist!"
        })
    }

    res.status(200).json({
        message: "Genre deleted successfully!"
    })
})


module.exports = router