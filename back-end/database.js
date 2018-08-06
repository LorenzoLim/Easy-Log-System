require('dotenv').config()
const mongoose = require('mongoose');

// Use the promise functionality built into Node
mongoose.Promise = global.Promise

const db = mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@ds163836.mlab.com:63836/easy-log-system`, {useMongoClient:true})
.then(() => {
  console.log('Successfully connected to database!')
})
.catch(error => {
  // SOmething went wrong!
  console.log('Error connecting to MongoDB database', error)
})

module.exports = { mongoose, db }
