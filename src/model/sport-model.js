const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const SportSchema = new mongoose.Schema({
    sportName : { type: String },
    athletes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Athlete'
    }]
},{ versionKey:false });

// Will init the ID with auto-incremental
SportSchema.plugin(AutoIncrement, {id:'sport_seq', inc_field: 'sport_id'});
const Sport = mongoose.model('Sport', SportSchema);
module.exports = Sport;