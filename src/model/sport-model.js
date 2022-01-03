const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const SportSchema = new mongoose.Schema({
    name : {
        type: String
    },
    photo : {
        type: String
    },
    athletes : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'athlete'
    }]
},{ versionKey:false });

// Will init the ID with auto-incremental
SportSchema.plugin(AutoIncrement, {id:'sport_seq', inc_field: 'sport_id'});
const Sport = mongoose.model('sport', SportSchema);
module.exports = Sport;