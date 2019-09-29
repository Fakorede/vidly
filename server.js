const mongoose = require('mongoose')
const Joi = require('joi')
const express = require('express')

const genres = require('./routes/genres')
const customers = require('./routes/customers')
const movies = require('./routes/movies')

mongoose.connect('mongodb://localhost/vidly')
    .then(() => console.log('Connected to mongoDB...'))
    .catch(err => console.log('Connection failed...'))

const app = express()

app.use(express.json())
app.use('/api/genres', genres)
app.use('/api/customers', customers)
app.use('/api/movies', movies)

app.get('/', (req, res) => {
    res.send("Welcome to the Vidly Api!")
})

const port = process.env.PORT || 5001

app.listen(port, () => {
    console.log(`Server listening on port ${port}...`)
})
