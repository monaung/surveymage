require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const admin = require('firebase-admin');
const cors = require('cors');
const serviceAccount = require('./serviceAccountKey.json');

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Initialize Express
const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://host.docker.internal:27017/survey-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to MongoDB successfully');
})
.catch((error) => {
  console.error('MongoDB connection error:', error);
});

// Firebase Auth Middleware
const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      return res.status(401).send('No authorization header');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).send('No token provided');
    }

    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error('Auth Error:', error);
    res.status(401).send('Invalid token');
  }
};

// Survey Schema
const surveySchema = new mongoose.Schema({
  userId: String,
  questions: [{
    id: String,
    text: String,
    type: {
      type: String,
      enum: ['multiple-choice', 'checkbox-list', 'short-text', 'long-text']
    },
    options: [String],
    answer: mongoose.Schema.Types.Mixed
  }],
  createdAt: { type: Date, default: Date.now }
});

const Survey = mongoose.model('Survey', surveySchema);

// Save Survey endpoint
app.post('/api/survey', authenticateToken, async (req, res) => {
  try {
    const { questions } = req.body;
    const survey = new Survey({
      userId: req.user.uid,
      questions
    });

    await survey.save();
    res.status(201).json({ message: 'Survey saved successfully', surveyId: survey._id });
  } catch (error) {
    console.error('Error saving survey:', error);
    res.status(500).json({ error: 'Failed to save survey' });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
