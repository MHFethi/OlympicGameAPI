const Sport = require('../model/sport-model');

/**
 * Get all Sports from db
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
const getAll = async (req, res) => {
    try {
        const sports = await Sport.find();
        return res.status(200).json({ success: true, sports });
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

/**
 * Save a new Sport in the database
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
const save = async (req, res) => {
    try {
        // Get Sport data from body
        const data = req.body.sport
        // Check that we don't have a empty body or empty Sport's name
        if (!data)throw new Error("No Sport data");
        if (!data.name)throw new Error("Sport name is required");

        // Save in the database the new Sport
        const sport = await Sport.create({
            name: data.name
        });

        if(sport)
            return res.status(201).json({sport})
    } catch (e) {
        const code = res.statusCode ? res.statusCode : 422;
        return res.status(code).json({ errors: { body: ['Could not create Sport', e.message] }});
    }
};

module.exports = {
    getAll,
    save
}