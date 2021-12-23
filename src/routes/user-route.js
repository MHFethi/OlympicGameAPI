const express = require('express')
const router = express.Router()
const UserController = require('../controller/user-controller')

router.get('/users', UserController.getAll);                             // Get all Users
router.get('/user/:id', UserController.getUserById);                     // Get User by ID
router.post('/user', UserController.createUser);                         // Save a new User
router.put('/user/:id', UserController.updateUser);                      // Update an existing User
router.delete('/user/:id', UserController.deleteUser);                   // Delete a User by ID

module.exports = router
