const express = require('express');
//need to require express because then we need to create a router off of express
const router = express.Router();

module.exports = router;

router.use('/students', require('./students'));
router.use('/tests', require('./tests'));
