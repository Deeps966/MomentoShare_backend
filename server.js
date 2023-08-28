const express = require("express");
const cors = require("cors");
const passport = require("passport");
const cookieParser = require('cookie-parser');

// const swaggerUi = require('swagger-ui-express');

require('dotenv').config({ path: '.env.development' })

// Own Imports
const passportSetup = require("./app/middleware/passport.middleware"); // Setup of passport don't remove
const logger = require('./app/utils/logger');
const routes = require('./app/routes')
const mongoose = require('./app/config/db.config');
const { validate_JWT_token } = require("./app/middleware/JWT.middleware");
const authController = require('./app/controllers/auth.controller');

const app = express();
const { PORT, SERVER_URL } = process.env
const corsOptions = {
  origin: SERVER_URL,
  methods: "GET,POST,PUT,DELETE",
  credentials: true,
}

// Global Variables
global.log = logger;

// Middlewares
app.use(express.json()) // parse requests of content-type - application/json
app.use(express.urlencoded({ extended: true })); // parse requests of content-type - application/x-www-form-urlencoded
app.use(cookieParser()); // Add the cookie-parser middleware
app.use(cors(corsOptions));
app.use(passport.initialize());

// Error handling middleware for JSON parsing errors
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ message: 'Invalid JSON payload' });
  }
  next();
});

// Logging every request with body and headers
app.use((req, res, next) => {
  console.log("-----------------------New Request-------------------")
  log.info(req.method + " " + req.url, req.headers)
  log.info('Request Body', req.body)
  next();
});

// ----------ROUTES----------
app.get("/", async (req, res) => {
  res.status(200).send("<h1>Hello Guys,<br><br> Welcome to MomentoShare Backend</h1>")
})

app.use("/auth", authController)
app.use("/api", validate_JWT_token, routes);

// router.use('/api-docs', swaggerUi.serve);
// router.get('/api-docs', swaggerUi.setup(swaggerDocument));

mongoose.connection.once("open", function () {
  app.listen(PORT, () => {
    log.info(`Server started at -> ${SERVER_URL}`)
  });
})
