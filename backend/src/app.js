const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/temas', require('./features/temas/routes/temas'));
app.use('/api/quiz', require('./features/quiz/routes/quiz'));

module.exports = app;
