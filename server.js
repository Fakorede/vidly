const config = require('config')
const mongoose = require('mongoose')
const winston = require('winston')
require('winston-mongodb')
const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)
const express = require('express')
require('express-async-errors')
const app = express()
require('./startup/routes')(app)

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

app.get('/', (req, res) => {
    res.send("Welcome to the Vidly Api!")
})

const port = process.env.PORT || 5001

app.listen(port, () => {
    console.log(`Server listening on port ${port}...`)
})
