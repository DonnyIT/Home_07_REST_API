const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const passport = require('passport')
const morgan = require('morgan')

const authController = require('./routes/auth')
const categoryController = require('./routes/category')

const keys = require('./config/keys')

const app = express()

app.use(passport.initialize())
require('./middleware/passport')(passport)

mongoose.connect(keys.mongoUrl)
  .then(() => console.log('MongoDB conected!'))
  .catch(error => console.log('Error'));

app.use(morgan('dev'))

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use('/api/auth', authController)
app.use('/api/category', categoryController)

app.get('/', function (req, res) {
    res.send('Hello World')
})



app.listen(4000, ()=>console.log('Server started on 4000'))