const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()
const PORT = process.env.PORT || 5000
const URI = process.env.CONNECTION_URI
const app = express()

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use('/api/auth', require('./routes/apiAuth'))
app.use('/api/users', require('./routes/users'))
app.use(cors())


const start = async () => {
  try {
    await mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    app.listen(PORT, (req, res) => {
      console.log(`Starting at ${PORT} `)
    })
  }
  catch (err) {
    console.log(err)
    process.exit(1)
  }
}

start()

