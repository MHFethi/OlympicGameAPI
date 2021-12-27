const Sport = require('../model/sport-model');

/**
 * Get all sports from db
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
const getAll = async (req, res) => {
    try {
        const sports = await Sport.find()
            .populate({path: 'athletes'});
        return res.status(200).json({ success: true, sports });
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

/**
 * Save a new Sport in the database
 *
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
const createSport = async (req, res) => {
    try {
        // Check data required
        if(!req.body.sport.sportName) throw new Error("Sport name is Required");

        // Save in the database the new Sport
        const sport = await Sport.create({
            sportName: req.body.sport.sportName,
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
    createSport
}