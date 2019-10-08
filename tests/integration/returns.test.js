const mongoose = require('mongoose')
const request = require('supertest')
const { Rental } = require('../../models/Rental')

describe('/api/returns', () => {

    let server, customerId, movieId, rental
    beforeEach(async () => {
        server = require('../../server')

        customerId = mongoose.Types.ObjectId()
        movieId = mongoose.Types.ObjectId()

        rental = new Rental({
            customer: {
                _id: customerId,
                name: '12345',
                phone: '12345'
            },
            movie: {
                _id: movieId,
                title: '12345',
                dailyRentalRate: 2
            }
        })

        await rental.save()
    })

    afterEach(async () => {
        await Rental.remove({})
        await server.close()
    })

    it('should work!', async () => {
        const res = await Rental.findById(rental._id)
        expect(res).not.toBeNull()
    })

    it('should return 401 if client is not logged in', async () => {
        const res = await request(server)
            .post('/api/returns')
            .send({ customerId, movieId })

        expect(res.status).toBe(401)

    })

    it('should return 400 if customerId is not provided', async () => {

    })
})