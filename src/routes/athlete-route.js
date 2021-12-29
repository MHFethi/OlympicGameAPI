const express = require('express')
const router = express.Router()
const AthleteController = require('../controller/athlete-controller')

router.get('/', AthleteController.getAll);                             // Get all Athletes
router.post('/', AthleteController.save);                             // Get all Athletes

module.exports = router;