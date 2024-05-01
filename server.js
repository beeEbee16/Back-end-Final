require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');
const router = require('./routes/subdir');
const PORT = process.env.PORT || 3500;

app.use(cors());

// Connect to DB
connectDB();

//Custom middlware
/* app.use((req, res, next) => {

}); */

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(router);

//app.use('/subdir', require('./routes/subdir'));

// Listen for port connection
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

//app.listen(PORT, () => console.log(`Server running on port ${PORT}`));