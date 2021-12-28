const express = require('express')
const router = express.Router()
const GenderController = require('../controller/gender-controller')
const {verifyToken} = require("../utils/auth");

router.get('/', GenderController.getAll);                         // Get all Gender
router.get('/:id', GenderController.getById);                     // Get Gender by ID
router.post('/', GenderController.save);                          // Save a new Gender
router.put('/:id', GenderController.update);                      // Update an existing Gender
router.delete('/:id', GenderController.deleteGender);             // Delete a Gender by ID

module.exports = router;
