const Joi = require('joi')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const genreSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
})

function validateGenre(genre) {
    const schema = {
        name: Joi.string().min(5).max(50).required()
    }
    return Joi.validate(genre, schema)
}

exports.genreSchema = genreSchema
module.exports = mongoose.model('Genre', genreSchema)
exports.validate = validateGenre