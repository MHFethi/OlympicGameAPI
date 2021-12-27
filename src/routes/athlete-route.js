const express = require('express')
const router = express.Router()
    const AthleteController = require('../controller/athlete-controller')

router.get('/athletes', AthleteController.getAll);                             // Get all Athletes

module.exports = router;