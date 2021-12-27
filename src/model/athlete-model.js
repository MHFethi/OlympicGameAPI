const mongoose = require('mongoose');
const {Schema} = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);

const AthleteSchema = new mongoose.Schema({
    firstName : { type: String },
    lastName: { type: String },
    sport: {//Parent referencing
        type:Schema.Types.ObjectId,
        ref:'sport',
        required:true
    }
},{ versionKey:false });

// Will init the ID with auto-incremental
AthleteSchema.plugin(AutoIncrement, {id:'athlete_seq', inc_field: 'athlete_id'});
const Athlete = mongoose.model('Athlete', AthleteSchema)
module.exports = Athlete;