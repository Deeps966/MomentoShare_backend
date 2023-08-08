const express = require('express')
const app = express()
const cors = require('cors')
const pool = require('pg')

// Middleware
app.use(cors())
app.use(express.json())

// Server Port
const PORT = 5000

// ----------ROUTES----------
app.get("/users", async (req, res) => {
  res.json({
    data: "Hello World"
  })
})

app.listen(PORT, () => {
  console.log(`Server listening at ${PORT}`)
})