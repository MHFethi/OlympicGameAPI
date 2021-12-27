const express = require('express')
const router = express.Router()
const UserController = require('../controller/user-controller')
const {verifyToken} = require("../utils/auth");

router.get('/', verifyToken, UserController.getAll);                             // Get all Users
router.get('/:id', verifyToken, UserController.getUserById);                     // Get User by ID
router.post('/', verifyToken, UserController.createUser);                         // Save a new User
router.put('/:id', verifyToken, UserController.updateUser);                      // Update an existing User
router.delete('/:id', verifyToken, UserController.deleteUser);                   // Delete a User by ID

module.exports = router
