const Joi = require('joi')
const express = require('express')
const router = express.Router()

const auth = require('../middlewares/auth')
const validate = require('../middlewares/validate')
const { Rental } = require('../models/Rental')
const { Movie } = require('../models/Movie')

router.post('/', [auth, validate(validateReturn)], async (req, res) => {
    const rental = await Rental.lookup(req.body.customerId, req.body.movieId)

    if (!rental) return res.status(404).send('Rental not found!')

    if (rental.dateReturned) return res.status(400).send('Return already processed!')

    rental.return()
    await rental.save()

    await Movie.update({ _id: rental.movie._id }, {
        $inc: { numberInStock: 1 }
    })

    return res.status(200).send(rental)
})

function validateReturn(req) {
    const schema = {
        customerId: Joi.objectId().required(),
        movieId: Joi.objectId().required()
    }
    return Joi.validate(req, schema)
}

module.exports = router