const express = require('express');
const router = express.Router();

router.use('/pcComponents', require('./pcComponent'));

module.exports = router;