const express = require('express')
const router = express.Router()
const SportController = require('../controller/sport-controller')
const GenderController = require("../controller/gender-controller");

router.get('/', SportController.getAll);                         // Get all Sports
router.get('/:id', SportController.getById);                     // Get Sport by ID
router.post('/', SportController.save);                          // Save a new Sport
router.put('/:id', SportController.update);                      // Update an existing Sport
router.patch('/:id/addAthlete', SportController.addAthlete);     // Add an athlete in  an existing Sport
router.patch('/:id/removeAthlete', SportController.removeAthlete);  // Remove an athlete in  an existing Sport
router.delete('/:id', SportController.deleteSport);              // Delete a Sport by ID

module.exports = router;