const Joi = require('joi')
const express = require('express')

const app = express()

app.use(express.json())

const genres = [
    { id: 1, name: 'Action' },
    { id: 2, name: 'Horror' }
]

// endpoints
app.get('/api/genres', (req, res) => {
    res.status(200).json({
        genres: genres
    })
})

app.post('/api/genres', (req, res) => {
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

app.put('/api/genres/:id', (req, res) => {
    const id = req.params.id
    const genre = genres.find(g => g.id === parseInt(id))

    if (!genre) {
        return res.status(404).json({
            message: "Genre does not exist!"
        })
    }

    genre.name = req.body.name

    res.status(201).json({
        message: "Genre updated successfully!",
        genre: genre
    })
})

app.delete('/genres/:id', (req, res) => {
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

const port = process.env.PORT || 5001

app.listen(port, () => {
    console.log(`Server listening on port ${port}...`)
})
