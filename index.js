const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')

const PORT = process.env.PORT || 5000
const URL = process.env.CONNECTION_URL || 'mongodb+srv://bboyredstar:RedStar1997@cluster0.fvger.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
console.log(URL);
const app = express()

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use('/api/auth', require('./routes/apiAuth'))
app.use('/api/users', require('./routes/users'))
app.use('/api/create-users', require('./routes/users'))
app.use(cors())


const start = async () => {
  try {
    await mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    app.listen(PORT, (req, res) => {
      console.log('Starting at 5000')
    })
  }
  catch (err) {
    console.log(err)
    process.exit(1)
  }
}

start()

