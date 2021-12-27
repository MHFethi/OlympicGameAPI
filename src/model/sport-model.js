const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const SportSchema = new mongoose.Schema({
    sportName : { type: String },
},{ versionKey:false });

// Will init the ID with auto-incremental
SportSchema.plugin(AutoIncrement, {id:'sport_seq', inc_field: 'sport_id'});

/**
 * SportSchema's virtuals definition
 * Explanation :
 * 1. First param ('athletes') can be named freely
 * 2. Options Object :
 *      ref: Model name for Child collection
 *      localfield: key reference id, stored in child doc, as named on parent doc
 *      foreignField: key name that holds localfield value on child doc
 */
SportSchema.virtual('athletes', {
    ref:'Athlete',//Model to use
    localField:'_id',//Find ind Model where localfield
    foreignField:'sport'//is equal to foreignField
});
//Set Object & Json property to true
SportSchema.set('toObject', {virtuals: true});
SportSchema.set('toJSON', {virtuals: true});

const Sport = mongoose.model('Sport', SportSchema);
module.exports = Sport;