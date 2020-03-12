const express = require('express');
const router = express.Router()

// Load each controller 
const loginController = require('./Login');

// Mount each controller to their respective routes
router.use('/login', loginController);

module.exports = router;