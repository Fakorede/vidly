const config = require('config')
const mongoose = require('mongoose')
const winston = require('winston')
require('winston-mongodb')
const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)
const express = require('express')
require('express-async-errors')

const genres = require('./routes/genres')
const customers = require('./routes/customers')
const movies = require('./routes/movies')
const rentals = require('./routes/rentals')
const users = require('./routes/users')
const auth = require('./routes/auth')
const error = require('./middlewares/error')

winston.handleExceptions(
    new winston.transports.File({ filename: 'uncaughtExceptions.log' })
)

process.on('unhandledRejection', (ex) => {
    winston.error(ex.message, ex)
    process.exit(1)
})

winston.add(winston.transports.File, { filename: 'logfile.log' })
winston.add(winston.transports.MongoDB, { db: 'mongodb://localhost/vidly', level: 'info' })

if (!config.get('jwtPrivateKey')) {
    console.log('FATAL ERROR: jwtPrivateKey is not defined!')
    process.exit(1)
}

mongoose.connect('mongodb://localhost/vidly')
    .then(() => console.log('Connected to mongoDB...'))
    .catch(err => console.log('Connection failed...'))

const app = express()

app.use(express.json())
app.use('/api/genres', genres)
app.use('/api/customers', customers)
app.use('/api/movies', movies)
app.use('/api/rentals', rentals)
app.use('/api/users', users)
app.use('/api/auth', auth)
app.use(error)

app.get('/', (req, res) => {
    res.send("Welcome to the Vidly Api!")
})

const port = process.env.PORT || 5001

app.listen(port, () => {
    console.log(`Server listening on port ${port}...`)
})
