require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');
const router = require('./routes/subdir');
const PORT = process.env.PORT || 3500;

// Connect to DB
connectDB();

app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(router);


// Listen for port connection
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
