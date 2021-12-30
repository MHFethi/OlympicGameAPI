const Gender = require('../model/gender-model')
const User = require("../model/user-model");

/**
 * Get all Genders from database
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const getAll = async (req, res) => {
    try {
        const genders = await Gender.find();
        return res.status(200).json({ genders });
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

/**
 * Get Gender by ID
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const getById = async (req, res) => {
    try {
        const gender = await Gender.findOne({ gender_id: parseInt(req.params.id)});
        if(!gender) {
            res.status(404);
            throw new Error("No Gender found");
        }
        return res.status(200).json({ gender });

    } catch (e) {
        const code = res.statusCode ? res.statusCode : 422;
        return res.status(code).json({ errors: { body: ['Something wrong happens', e.message] }});
    }
};

/**
 *  Save a new Gender in the database
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const save = async (req, res) => {
    try {
        const data = req.body.gender
        if (!data.name)throw new Error("Gender name is required");
        // Save in the database the new Gender
        const gender = await Gender.create({
            name: data.name
        });

        if(gender) return res.status(201).json({gender});
    } catch (e) {
        const code = res.statusCode ? res.statusCode : 422;
        return res.status(code).json({ errors: { body: ['Could not create Gender', e.message] }});
    }
};

/**
 * Update an existing Gender by ID
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const update = async (req, res) => {
    try {
        // Get gender data from body
        const data = req.body.gender

        // Check that we don't have a empty body or empty Gender's name
        if (!data)throw new Error("No Gender data");

        // Get gender data from body
        const id = req.params.id;

        // Check if the gender already exist in the db
        let gender = await Gender.findOne({ gender_id: id });
        if(!gender) {
            res.status(404);
            throw new Error("No Gender found");
        }

        // Init old or new value depending of if we get data from body
        const name = data.name ? data.name : gender.name;

        // Update the Gender in the db
        gender = await Gender.updateOne({ gender_id: id }, { name: name });
        return res.status(200).json({ gender });
    } catch (e) {
        const code = res.statusCode ? res.statusCode : 422;
        return res.status(code).json({ errors: { body: ['Could not update Gender', e.message] }});
    }
};

/**
 * Delete Gender in the database by ID
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const deleteGender = async (req, res) => {
    try {
        // Get Gender data from body
        const id = req.params.id;
        // Check if the Gender already exist in the db
        let gender = await Gender.findOne({ gender_id: id });
        if(!gender) {
            res.status(404);
            throw new Error("No Gender found");
        }
        // Delete the Gender in the db
        await Gender.deleteOne(gender);
        res.status(200).json({ message: 'Gender deleted successfully' });
    } catch (e) {
        const code = res.statusCode ? res.statusCode : 422;
        res.status(code).json({errors: { body: [ 'Could not delete Gender ', e.message ] }})
    }
};

// Export all CRUD methods
module.exports = {
    getAll,
    getById,
    save,
    update,
    deleteGender
}