const Athlete = require("../model/athlete-model");
const Gender = require("../model/gender-model");
const Country = require('../model/country-model')

/**
 * Get all Athletes from db
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
const getAll = async (req, res) => {
    try {
        const athletes = await Athlete.find()
            .populate('gender')
            .populate('country')
            .exec();

        res.render('athletes', {athletes});
        //return res.status(200).json({ athletes });
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

/**
 * Get Athletes by ID from db
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
const getById = async (req, res) => {
    try {
        // Get Country data from body
        const id = req.params.id;
        const athlete = await Athlete.findOne({ athlete_id: id });
        if(!athlete) {
            res.status(404);
            throw new Error("No Athlete found");
        }
        return res.status(200).json({ athlete });

    } catch (e) {
        const code = res.statusCode ? res.statusCode : 422;
        return res.status(code).json({ errors: { body: ['Something wrong happens', e.message] }});
    }
};

/**
 * Save a new Athlete in the database
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const save = async (req, res) => {
    try {
        // Get gender data from body
        const data = req.body

        // Check that we don't have a empty body or empty Country's name
        console.log(data)

        if (!data)throw new Error("No Athlete data");
        if (!data.firstName)throw new Error("Athlete first name is required");
        if (!data.lastName)throw new Error("Athlete last name is required");
        if (!data.gender.gender_id)throw new Error("Gender is required");
        if (!data.country.country_id)throw new Error("Country is required");

        const gender = await Gender.findOne({ gender_id: data.gender.gender_id });
        if (!gender) throw new Error("Any Gender found");

        const country = await Country.findOne({ country_id: data.country.country_id });
        if (!country) throw new Error("Any Country found");


        // Save in the database the new Gender
        const athlete = await Athlete.create({
            firstName: data.firstName,
            lastName: data.lastName,
            photo: data.photo,
            gender:gender,
            country:country
        });

        if(athlete) return res.status(201).json({athlete});

    } catch (e) {
        const code = res.statusCode ? res.statusCode : 422;
        return res.status(code).json({ errors: { body: ['Could not create Athlete', e.message] }});
    }
};

/**
 * Update an existing Athlete by ID
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
const update = async (req, res) => {
    try {
        // Get gender data from body
        const data = req.body.athlete
        // Get gender data from body
        const id = req.params.id;

        // Check that we don't have a empty body or empty Gender's name
        if (!data)throw new Error("No Athlete data")

        let athlete = await Athlete.findOne({ athlete_id: id });
        if(!athlete) {
            res.status(404);
            throw new Error("No Athlete found");
        }
        // Init old or new value depending of if we get data from body
        const firstName = data.firstName ? data.firstName : athlete.firstName;
        const lastName = data.lastName ? data.lastName : athlete.lastName;
        const photo = data.photo ? data.photo : athlete.photo;

        // Check the validation data for gender before updating
        let gender;
        if (data.gender.gender_id){
             gender = await Gender.findOne({ gender_id: data.gender.gender_id });
            if (!gender) throw new Error("Any Gender found");
        } else {
             gender =  athlete.gender.gender_id;
        }

        // Check the validation data for country before updating
        let country;
        if (data.country.country_id){
             country = await Country.findOne({ country_id: data.country.country_id });
            if (!country) throw new Error("Any Country found");
        } else {
            country =  athlete.country.country_id;
        }

        athlete = await Athlete.updateOne({ gender_id: id }, {
            firstName: firstName,
            lastName: lastName,
            photo: photo,
            gender: gender,
            country: country
        });

        return res.status(200).json({ athlete });
    } catch (e) {
        const code = res.statusCode ? res.statusCode : 422;
        return res.status(code).json({ errors: { body: ['Could not update Athlete', e.message] }});
    }
};

/**
 * Delete Athlete in the database by ID
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const deleteAthlete = async (req, res) => {
    try {
        // Check first if the Athlete exist in the db
        const athlete = await Athlete.findOne({ athlete_id: parseInt(req.params.id)});
        if(!athlete) throw new Error("No athlete found");

        // Delete the Athlete in the db
        await Athlete.deleteOne(athlete);
        res.status(200).json({ message: 'Athlete deleted successfully' });
    } catch (e) {
        const code = res.statusCode ? res.statusCode : 422;
        res.status(code).json({errors: { body: [ 'Could not Athlete user ', e.message ] }})
    }
};



module.exports = {
    getAll,
    getById,
    save,
    update,
    deleteAthlete
}