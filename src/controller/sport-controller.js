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

module.exports = {
    getAll
}