const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/states', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'model', 'statesData.json'));
});


module.exports = router;