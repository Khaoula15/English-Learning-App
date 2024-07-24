require('dotenv').config();
const express = require('express');
const { json, urlencoded } = require('body-parser');
const cors = require('cors');
const { connect } = require('mongoose');
const { default: mongoose } = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;
// Connect to MongoDB
(() => {
  return console.log('MongoDB connected') || connect(process.env.MONGO_URI, {useNewUrlParser: true,
    useUnifiedTopology: true,
  })
      .then;
})
.catch(err => console.log('MongoDB connection error:', err));

// Middleware
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:8080',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token']
}));

// Routes
import authRoutes from './routes/auth';
import lessonRoutes from './routes/lessons';
import paymentRoutes from './routes/payments';
import userRoutes from './routes/users';

app.use('/api/auth', require('./routes/auth'));
app.use('/api/lessons', require('./routes/lessons'));
app.use('/api/payments', require('./routes/payments'));
app.use('/api/users', require('./routes/users'));


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});

// Start the server

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});