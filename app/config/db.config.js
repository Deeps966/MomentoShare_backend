const mongoose = require('mongoose')
const { MONGO_URL } = process.env

mongoose.connect(MONGO_URL)
  .then(() => {
    console.log(`connected to database at -> ${MONGO_URL}`);
  })
  .catch((err) => {
    console.log('Mongo Database connection error')
  })

module.exports = mongoose