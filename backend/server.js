require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => {
  console.error('Could not connect to MongoDB:', err.message);
  process.exit(1);
});

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configure CORS
app.use(cors({
  origin: 'http://localhost:8080', // Replace with your frontend URL
  credentials: true,
}));

// Routes
const authRoutes = require('./routes/auth');
const lessonRoutes = require('./routes/lessons');
app.use('/api/auth', authRoutes);
app.use('/api/lessons', lessonRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'An internal server error occurred.' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
