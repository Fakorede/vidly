const express = require('express')
const router = express.Router()

const genres = [
    { id: 1, name: 'Action' },
    { id: 2, name: 'Horror' }
]

// endpoints
router.get('/', (req, res) => {
    res.status(200).json({
        genres: genres
    })
})

router.get('/:id', (req, res) => {
    const id = req.params.id
    const genre = genres.find(g => g.id === parseInt(id))

    if (!genre) {
        return res.status(404).json({
            message: "Genre does not exist!"
        })
    }

    res.status(200).json({
        genres: genres
    })
})

router.post('/', (req, res) => {
    const { error } = validateGenre(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const newGenre = {
        id: genres.length + 1,
        name: req.body.name
    }

    genres.push(newGenre)
    res.status(201).json({
        message: "Genre created successfully!",
        genre: newGenre
    })
})

router.put('/:id', (req, res) => {
    const id = req.params.id
    const genre = genres.find(g => g.id === parseInt(id))

    if (!genre) {
        return res.status(404).json({
            message: "Genre does not exist!"
        })
    }

    const { error } = validateGenre(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    genre.name = req.body.name

    res.status(201).json({
        message: "Genre updated successfully!",
        genre: genre
    })
})

router.delete('/:id', (req, res) => {
    const id = req.params.id
    const genre = genres.find(g => g.id === parseInt(id))

    if (!genre) {
        return res.status(404).json({
            message: "Genre does not exist!"
        })
    }

    const index = genres.indexOf(genre)
    genres.splice(index, 1)

    res.status(201).json({
        message: "Genre deleted successfully!"
    })
})

function validateGenre(genre) {
    const schema = {
        name: Joi.string().min(3).required()
    }
    return Joi.validate(genre, schema)
}

module.exports = router