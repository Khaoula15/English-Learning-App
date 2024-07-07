# Webstack - Portfolio Project 

# Full-Stack Web Application

# Objective: Full-Stack Software Engineer

# Certification Full-Stack

# English-Learning-App

# 1. setting up the Backend

# 1-1 Node 
 npm init -y
 npm install express mongoose bcrypt jsonwebtoken dotenv cors

# 1-2.Creating an app.js file

// english-learning-platform/backend/node/src/app.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// Routes will be added here

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;

# 1-3. setup flask app
 python3 -m venv venv
 source venv/bin/activate
 pip install flask flask-sqlalchemy flask-bcrypt flask-jwt-extended python-dotenv

# 1-4 creating the init file

# english-learning-platform/backend/flask/app/__init__.py

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('SQLALCHEMY_DATABASE_URI')
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')

db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

# Routes will be imported here

if __name__ == '__main__':
    app.run(debug=True)
