const User = require('../model/user-model');
const {hashPassword} = require("../utils/utils");

/**
 * Get all Users from database
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
const getAll = async (req, res) => {
    try {
        const users = await User.find();
        return res.status(200).json({ users });
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

/**
 * Get User by ID
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
const getUserById = async (req, res) => {
    try {
        const user = await User.findOne({ user_id: parseInt(req.params.id)});
        if(!user) {
            res.status(404)
            throw new Error("No user found");
        }
        return res.status(200).json({ user });
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

/**
 * Save a new User in the database
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
const createUser = async (req, res) => {
    try {
        // Check data required
       if(!req.body.user.username) throw new Error("Username is Required");
       if(!req.body.user.password) throw new Error("Password is Required");

       // Hash the password for security
        const password = await hashPassword(req.body.user.password);

        // Save in the database the new User
        const user = await User.create({
            username: req.body.user.username,
            password: password,
        });

        if(user)
            return res.status(201).json({user})
    } catch (e) {
        const code = res.statusCode ? res.statusCode : 422;
        return res.status(code).json({ errors: { body: ['Could not create User', e.message] }});
    }
};

/**
 * Update an existing User by ID
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
const updateUser = async (req, res) => {
    try {
        // Check that we don't have a empty body
        if (!req.body.user) throw new Error('No User data');
        // Get data from body and id from the URL param
        const data = req.body.user;
        const id = req.params.id;
        // Check if the user already exist in the db
        let user = await User.findOne({ user_id: id });

        if (!user) {
            res.status(404);
            throw new Error('User not found');
        }
        // Init old or new value depending of if we get data from body
        const password = data.password ? await hashPassword(req.body.user.password) : user.password;
        const username = data.username ? data.username : user.username;

        // Update the user in the db
        user = await User.updateOne({ user_id: id }, { username: username , password: password })
        return res.status(200).json({ user });
    } catch (e) {
        const code = res.statusCode ? res.statusCode : 422;
        return res.status(code).json({ errors: { body: ['Could not update User', e.message] }});
    }
};

/**
 * Delete User in the database by ID
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const deleteUser = async (req, res) => {
    try {
        // Check first if the user exist in the db
        const user = await User.findOne({ user_id: parseInt(req.params.id)});
        if(!user) throw new Error("No user found");

        // Delete the user in the db
        await User.deleteOne(user);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (e) {
        const code = res.statusCode ? res.statusCode : 422;
        res.status(code).json({errors: { body: [ 'Could not delete user ', e.message ] }})
    }
};

// Export all CRUD methods
module.exports = {
    createUser,
    getUserById,
    getAll,
    updateUser,
    deleteUser,
}