const express = require('express')
const router = express.Router()
const AthleteController = require('../controller/athlete-controller')

router.get('/', AthleteController.getAll);                             // Get all Athletes
router.get('/:id', AthleteController.getById);                     // Get Gender by ID
router.post('/', AthleteController.save);                             // Get all Athletes
router.put('/:id', AthleteController.update);                     // Get Gender by ID
router.delete('/:id', AthleteController.deleteAthlete);                     // Get Gender by ID

module.exports = router;