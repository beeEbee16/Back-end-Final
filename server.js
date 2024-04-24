require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose').promises;
const connectDB = require('./config/dbConn');
const router = require('./routes/subdir');
const file = require('./middleware/stateFileUtil');
const PORT = process.env.PORT || 3500;

// Connect to DB
//connectDB();

//Custom middlware
app.use((req, res, next) => {

});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(router);

app.use('/subdir', require('./routes/subdir'));

router.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

router.route('/states/:code').get((req, res) => {
    res.json({ 'id': req.params.code });
});

router.get('/*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});


// Listen for port connection
/* mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}); */

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));