const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost/english-learning-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Routes
const authRoutes = require('./routes/auth');
const lessonRoutes = require('./routes/lessons');

app.use('/api/auth', authRoutes);
app.use('/api/lessons', lessonRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
