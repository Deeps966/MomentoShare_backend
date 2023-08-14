const cookieSession = require("cookie-session");
const express = require("express");
const cors = require("cors");
const passport = require("passport");
// const swaggerUi = require('swagger-ui-express');

require('dotenv').config({ path: '.env.development' })

// Own Imports
const passportSetup = require("./app/middleware/passport.middleware"); // Setup of passport don't remove
const logger = require('./app/utils/logger');
const routes = require('./app/routes')
const mongoose = require('./app/config/db.config')

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
app.use(
  cookieSession({ name: "session", keys: ["lama"], maxAge: 24 * 60 * 60 * 100 })
);
app.use(cors(corsOptions));
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
  log.info(req.method + " " + req.url, req.body)
  next();
});

// ----------ROUTES----------
app.get("/", async (req, res) => {
  res.status(200).send("<h1>Hello Guys,<br><br> Welcome to MomentoShare Backend</h1>")
})

app.use("/", routes);

// router.use('/api-docs', swaggerUi.serve);
// router.get('/api-docs', swaggerUi.setup(swaggerDocument));

mongoose.connection.once("open", function () {
  // listen to port
  app.listen(PORT, () => {
    log.info(`Server started at -> ${SERVER_URL}`)
  });
})
