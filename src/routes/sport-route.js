const express = require('express')
const router = express.Router()
const SportController = require('../controller/sport-controller')

router.get('/', SportController.getAll);                             // Get all Sports
router.post('/', SportController.save);
module.exports = router;