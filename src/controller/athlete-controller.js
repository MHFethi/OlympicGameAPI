const Athlete = require("../model/athlete-model");

/**
 * Get all Athletes from db
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
const getAll = async (req, res) => {
    try {
        const athletes = await Athlete.find();
        return res.status(200).json({ athletes });
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

module.exports = {
    getAll
}