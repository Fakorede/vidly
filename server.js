const express = require('express')

const app = express()

app.use(express.json())

const genres = [

]

// endpoints
app.get('/genres', (req, res) => {

})

app.post('/genres', (req, res) => {

})

app.put('/genres/:id', (req, res) => {

})

app.delete('/genres/:id', (req, res) => {

})

const port = process.env.PORT || 5001

app.listen(port, () => {
    console.log(`Server listening on port ${port}...`)
})
