const Joi = require('joi')
const express = require('express')

const genres = require('./routes/genres')

const app = express()

app.use(express.json())
app.use('/api/genres', genres)

app.get('/', (req, res) => {
    res.send("Welcome to the Vidly Api!")
})

const port = process.env.PORT || 5001

app.listen(port, () => {
    console.log(`Server listening on port ${port}...`)
})
