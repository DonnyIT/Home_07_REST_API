const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const morgan = require('morgan');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const categoryRoutes = require('./routes/category'); 
const productRoutes = require('./routes/product'); 
const keys = require('./config/keys');

const app = express();

// Налаштування CORS для дозволу запитів з клієнта
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true                
}));

app.use(passport.initialize());
require('./middleware/passport')(passport);

// Підключення до MongoDB
mongoose.connect(keys.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected!'))
  .catch(error => console.log('Error connecting to MongoDB:', error));

// Логування запитів
app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/products', productRoutes);

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(4000, () => console.log('Server started on port 4000'));
