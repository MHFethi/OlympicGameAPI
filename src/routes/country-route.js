const express = require('express')
const router = express.Router()
const CountryController = require("../controller/country-controller")
const {verifyToken} = require("../utils/auth");

router.get('/', CountryController.getAll)
router.get('/:id', CountryController.getById)
router.post('/', CountryController.save)
router.put('/:id', CountryController.update)
router.delete('/:id', CountryController.deleteCountry)

module.exports = router;