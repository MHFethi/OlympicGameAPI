const Country = require('../model/country-model')

/**
 * Get all Countries from database
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const getAll = async (req, res) => {
    try {
        const countries = await Country.find();
        res.render('countries', { countries });
        return countries;

        //return res.status(200).json({ countries });
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

/**
 * Get Country by ID
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const getById = async (req, res) => {
    try {
        // Get Country data from body
        const id = req.params.id;
        const country = await Country.findOne({ country_id: id });
        if(!country) {
            res.status(404);
            throw new Error("No Country found");
        }
        return res.status(200).json({ country });

    } catch (e) {
        const code = res.statusCode ? res.statusCode : 422;
        return res.status(code).json({ errors: { body: ['Something wrong happens', e.message] }});
    }
};

/**
 *  Save a new Country in the database
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const save = async (req, res) => {
    try {
        // Get gender data from body
        const data = {
            "name":req.body.name,
            "code": req.body.code,
        };

        // Check that we don't have a empty body or empty Country's name
        if (!data)throw new Error("No Country data");
        if (!data.name)throw new Error("Country name is required");
        if (!data.code)throw new Error("Country code is required");

        // Save in the database the new Gender
        const country = await Country.create({
            name: data.name,
            code: data.code
        });

        if(country) return res.status(201).json({country});

    } catch (e) {
        const code = res.statusCode ? res.statusCode : 422;
        return res.status(code).json({ errors: { body: ['Could not create Gender', e.message] }});
    }
};

/**
 * Update an existing Country by ID
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const update = async (req, res) => {
    try {
        // Get gender data from body
        const data = req.body.country
        // Get gender data from body
        const id = req.params.id;

        // Check that we don't have a empty body or empty Country's name
        if (!data)throw new Error("No Country data");

        // Check if the Country already exist in the db
        let country = await Country.findOne({ country_id: id });
        if(!country) {
            res.status(404);
            throw new Error("No Country found");
        }

        // Init old or new value depending of if we get data from body
        const name = data.name ? data.name : country.name;
        const code = data.code ? data.code : country.code;

        // Update the Country in the db
        country = await Country.updateOne(
            { country_id: id },
            { name: name, code: code });
        return res.status(200).json({ country });
    } catch (e) {
        const code = res.statusCode ? res.statusCode : 422;
        return res.status(code).json({ errors: { body: ['Could not update Country', e.message] }});
    }
};

/**
 * Delete Country in the database by ID
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const deleteCountry = async (req, res) => {
    try {
        // Get Country data from body
        const id = req.params.id;
        // Check if the Country already exist in the db
        const country = await Country.findOne({ country_id: id });
        if(!country) {
            res.status(404);
            throw new Error("No Country found");
        }
        // Delete the Country in the db
        await Country.deleteOne(country);
        res.status(200).json({ message: 'Country deleted successfully' });
    } catch (e) {
        const code = res.statusCode ? res.statusCode : 422;
        res.status(code).json({errors: { body: [ 'Could not delete Country ', e.message ] }})
    }
};

// Export all CRUD methods
module.exports = {
    getAll,
    getById,
    save,
    update,
    deleteCountry
}