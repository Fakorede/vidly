const express = require('express')

const app = express()

app.use(express.json())

const port = process.env.PORT || 5001

app.listen(port, () => {
    console.log(`Server listening on port ${port}...`)
})
