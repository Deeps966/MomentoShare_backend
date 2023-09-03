const express = require("express")
const cors = require("cors")
const passport = require("passport")
const cookieParser = require('cookie-parser')

// const swaggerUi = require('swagger-ui-express')

require('dotenv').config({ path: '.env.development' })

// Own Imports
const passportSetup = require("./app/middleware/passport.middleware") // Setup of passport don't remove
const mongoose = require('./app/config/db.config')
const authController = require('./app/controllers/auth.controller')
const { validate_JWT_token } = require("./app/middleware/JWT.middleware")
const multerSetup = require('./app/middleware/multer.middleware') // Setup of multer for Uploading files
const logger = require('./app/utils/logger')
const viewRoutes = require('./app/routes/route')
const apiRoutes = require('./app/routes/api')

const app = express()
const { PORT, SERVER_URL } = process.env
const corsOptions = {
  origin: SERVER_URL,
  methods: "GET,POST,PUT,DELETE",
  credentials: true,
}

// Global Variables
global.log = logger

// Middlewares
app.use(express.json()) // parse requests of content-type - application/json
app.use(express.urlencoded({ extended: true })) // parse requests of content-type - application/x-www-form-urlencoded
app.use(cookieParser()) // Add the cookie-parser middleware
app.use(cors(corsOptions))
app.use(passport.initialize())
// app.use(multerSetup)

// Serve static files from the 'uploads' directory
app.use('/public', express.static('public'))

// Error handling middleware for JSON parsing errors
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ message: 'Invalid JSON payload' })
  }
  next()
})

// Logging every request with body and headers
app.use((req, res, next) => {
  console.log("-----------------------New Request-------------------")
  log.info(req.method + " " + req.url, req.headers)
  log.info('Request Body', req.body)
  next()
})

// ----------ROUTES----------
app.use("/auth", authController)
app.use("/api", validate_JWT_token, apiRoutes)
app.use("/", viewRoutes)

// router.use('/api-docs', swaggerUi.serve)
// router.get('/api-docs', swaggerUi.setup(swaggerDocument))

mongoose.connection.once("open", function () {
  app.listen(PORT, () => {
    log.info(`Server started at -> ${SERVER_URL}`)
  })
})
