const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const GenderSchema = new mongoose.Schema({
    name : { type: String }
},{ versionKey: false });


//Will init the ID with auto-incremental
GenderSchema.plugin(AutoIncrement, { id: 'gender_seq', inc_field:'gender_id'});
const Gender = mongoose.model('gender', GenderSchema);
module.exports = Gender;