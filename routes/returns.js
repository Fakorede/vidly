const express = require('express')
const router = express.Router()

const { Rental, validate } = require('../models/Rental')

router.post('/', async (req, res) => {
    res.status(401).send('unauthorized!')

    const rental = new Rental({
        
    })
})

module.exports = router