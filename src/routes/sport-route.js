const express = require('express')
const router = express.Router()
const SportController = require('../controller/sport-controller')

router.get('/', SportController.getAll);                             // Get all Sports
router.post('/', SportController.createSport);
module.exports = router;