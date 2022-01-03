const Sport = require('../model/sport-model');
const Athlete = require("../model/athlete-model");

/**
 * Get all Sports from db
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
const getAll = async (req, res) => {
    try {
        const sports = await Sport.find()
            .populate('athletes').exec();

        const athletes = await Athlete.find();
        res.render('sports', { sports, athletes });
        //return res.status(200).json({ success: true, sports });
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

/**
 * Get Sport by ID from db
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
const getById = async (req, res) => {
    try {

        // Get Country data from body
        const id = req.params.id;
        const sport = await Sport.findOne({ sport_id: id });
        if(!sport) {
            res.status(404);
            throw new Error("No Sport found");
        }
        return res.status(200).json({ sport });
    } catch (e) {
        const code = res.statusCode ? res.statusCode : 422;
        return res.status(code).json({ errors: { body: ['Something wrong happens', e.message] }});
    }
};

/**
 * Save a new Sport in the database
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
const save = async (req, res) => {
    try {
        // Get Sport data from body
        const athletes = [];

        const data = {
            "name":req.body.name,
            "photo": req.body.photo,
            "athletes":athletes
        };

        // Check that we don't have a empty body or empty Sport's name
        if (!data)throw new Error("No Sport data");
        if (!data.name)throw new Error("Sport name is required");

        // Find in the database if the new sport does not already existing
        let sport = await Sport.findOne({ name: data.name });
        if (sport) throw new Error("Sport already existing, You should try an PUT method");

        if (data.athletes) {
            // Init each athlete for the sport
            for (let athlete of data.athletes) {
                athlete = await Athlete.findOne({ athlete_id: athlete.athlete_id });
                if (!athlete) throw new Error("Any athlete with your information found ");
                athletes.push(athlete);
            }
        }
        // Save in the database the new Sport
        sport = await Sport.create({
            name: data.name,
            photo: data.photo,
            athletes:athletes
        });
        if(sport)
           // res.redirect('/api/sports');
            return res.status(201).json({sport});
    } catch (e) {
        const code = res.statusCode ? res.statusCode : 422;
        return res.status(code).json({ errors: { body: ['Could not create Sport', e.message] }});
    }
};

/**
 * Update an existing Sport by ID
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
const update = async (req, res) => {
    try {
        // Get Sport data from body
        const data = req.body.sport;
        // Get Sport data from body
        const id = req.params.id;
        const athletes = new Array();
        // Check that we don't have a empty body
        if (!data)throw new Error("No Athlete data");

        let sport = await Sport.findOne({ sport_id: id });
        if(!sport) {
            res.status(404);
            throw new Error("No Sport found");
        }
        // Init old or new value depending of if we get data from body
        const name = data.name ? data.name : sport.name;
        const photo = data.photo ? data.photo : sport.photo;
        
        if (data.athletes) {
            // Init each athlete for the sport
            for (let athlete of data.athletes) {
                    athlete = await Athlete.findOne({ athlete_id: athlete.athlete_id });
                    if (!athlete) throw new Error("Any athlete with your information found ");
                    athletes.push(athlete);
            }
        }

        sport = await Sport.updateOne({ sport_id: id }, {
            name: name,
            photo:photo,
            athletes:athletes
        });

        return res.status(200).json({ sport });
    } catch (e) {
        const code = res.statusCode ? res.statusCode : 422;
        return res.status(code).json({ errors: { body: ['Could not update Athlete', e.message] }});
    }
};


const addAthlete = async (req, res) => {
    try {
        // Get athlete data from body
        const data = req.body.athlete;
        // Get athlete data from body
        const id = req.params.id;
        console.log(id)
        // Check that we don't have a empty body
        if (!data)throw new Error("No Athlete data");

        let sport = await Sport.findOne({ sport_id: id });
        if(!sport) {
            res.status(404);
            throw new Error("No Sport found");
        }

        const athlete = await Athlete.findOne({ athlete_id: data.athlete_id });
        if(!athlete) {
            res.status(404);
            throw new Error("No athlete found");
        }

        let athletes = sport.athletes;
        
        // TODO: Add athlete in sport only if not alreading in (avoid duplicated athletes in sport) still in progress
        if(athletes.length === 0){
            athletes.push(athlete)
        } else {
            for (let athlete of athletes) {
                const find = await Athlete.findOne({ _id: athlete._id });
                if(find.athlete_id == data.athlete_id ) {
                    throw new Error("This Athlete with ID  "+ data.athlete_id +" is already existing in this sport");
                } else {
                    athletes.push(find)
                }
            }
        }

        console.log(athletes)
        sport = await Sport.updateOne({ sport_id: id }, {
            athletes:athletes
        });

        return res.status(200).json({ sport });
    } catch (e) {
        const code = res.statusCode ? res.statusCode : 422;
        return res.status(code).json({ errors: { body: ['Could not update Athlete', e.message] }});
    }
};

const removeAthlete = async (req, res) => {
    try {
        // Get athlete data from body
        const data = req.body.athlete;
        // Get athlete data from body
        const id = req.params.id;
        // Check that we don't have a empty body
        if (!data)throw new Error("No Athlete data");

        let sport = await Sport.findOne({ sport_id: id });
        if(!sport) {
            res.status(404);
            throw new Error("No Sport found");
        }

        let athletes = sport.athletes;

    } catch (e) {
        const code = res.statusCode ? res.statusCode : 422;
        return res.status(code).json({ errors: { body: ['Could not update Athlete', e.message] }});
    }
};



/**
 * Delete Sport in the database by ID
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const deleteSport = async (req, res) => {
    try {
        // Get Sport data from body
        const id = req.params.id;
        const sport = await Sport.findOne({ sport_id: id });
        if(!sport) throw new Error("No Sport found");

        // Delete the Sport in the db
        await Sport.deleteOne(sport);
        res.status(200).json({ message: 'Sport deleted successfully' });
    } catch (e) {
        const code = res.statusCode ? res.statusCode : 422;
        res.status(code).json({errors: { body: [ 'Could not deleted Sport ', e.message ] }});
    }
};


module.exports = {
    getAll,
    getById,
    save,
    update,
    deleteSport,
    addAthlete,
    removeAthlete
}