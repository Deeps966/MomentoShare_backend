const express = require('express')
const app = express()
const cors = require('cors')

// Middleware
app.use(cors())
app.use(express.json())

// Server Port
const PORT = 5000

app.listen(PORT, () => {
  console.log(`Server listening at ${PORT}`)
})