const User = require('../model/user-model');
const {matchPassword} = require("../utils/utils");
const {generateAccessToken} = require("../utils/auth");

const login = async (req, res) => {
    try {
        // Check data required
        if(!req.body.user.username) throw new Error("Username is Required");
        if(!req.body.user.password) throw new Error("Password is Required");
        // Find if the user exists
        const user = await User.findOne({username:req.body.user.username});
        if(!user){
            res.status(401);
            throw new Error("No user found with this username")
        }
        // Compare the user password with the one which is use in the request body
        const passwordMatch = await matchPassword(user.password, req.body.user.password);
        if(!passwordMatch){
            res.status(401);
            throw new Error("Password is wrong");
        }
        // Genere the JWT Token
        const accessToken = generateAccessToken(user);
        console.log(accessToken);
        res.status(200).json({ message: 'You have been connected successfully' });
    } catch (e) {
        return res.status(500).send(e.message);
    }
};

// Export
module.exports = {
    login
}