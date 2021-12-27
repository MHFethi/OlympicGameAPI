const express = require('express')
const router = express.Router()
const SportController = require('../controller/sport-controller')

router.get('/sports', SportController.getAll);                             // Get all Sports

module.exports = router;