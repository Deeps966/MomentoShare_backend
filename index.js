const cookieSession = require("cookie-session");
const express = require("express");
const cors = require("cors");
const passport = require("passport");
require('dotenv').config({ path: '.env.development' })
const swaggerUi = require('swagger-ui-express');

// Own Imports
const passportSetup = require("./utils/passport");
const authRoute = require("./routes/auth");
const { PORT, SERVER_URL } = process.env

// Initialized express server by creating object
const app = express();

// Middlewares
app.use(express.json())
app.use(
  cookieSession({ name: "session", keys: ["lama"], maxAge: 24 * 60 * 60 * 100 })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(
  cors({
    origin: SERVER_URL,
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

// ----------ROUTES----------
// router.use('/api-docs', swaggerUi.serve);
// router.get('/api-docs', swaggerUi.setup(swaggerDocument));

app.get("/", async (req, res) => {
  res.status(200).send("<h1>Hello Guys,<br><br> Welcome to MomentoShare Backend</h1>")
})

app.use("/auth", authRoute);

app.listen(PORT, () => {
  console.log(`Server listening at ${PORT} and SERVER_URL -> ${SERVER_URL}`)
})



