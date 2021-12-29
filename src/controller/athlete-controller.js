const Athlete = require("../model/athlete-model");
const Sport = require("../model/sport-model");

/**
 * Get all Athletes from db
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
const getAll = async (req, res) => {
    try {
        const athletes = await Athlete.find()
            .populate({ path: 'sport'});
        return res.status(200).json({ athletes });
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

/**
 *  Save a new Athlete in the database
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const save = async (req, res) => {
    try {
        // Get gender data from body
        const data = req.body.athlete

        // Check that we don't have a empty body or empty Country's name
        if (!data)throw new Error("No Athlete data");
        if (!data.firstName)throw new Error("Athlete first name is required");
        if (!data.lastName)throw new Error("Athlete last name is required");
        if (!data.sport) throw new Error("Sport is missing");

        const sport = await Sport.findOne({sport_id: data.sport.sport_id});
        if (!sport) throw new Error("Any sport with your information found ");

        // Save in the database the new Gender
        const athlete = await Athlete.create({
            firstName: data.firstName,
            lastName: data.lastName,
            sport: sport
        });

        if(athlete) return res.status(201).json({athlete});

    } catch (e) {
        const code = res.statusCode ? res.statusCode : 422;
        return res.status(code).json({ errors: { body: ['Could not create Athlete', e.message] }});
    }
};




module.exports = {
    getAll,
    save
}