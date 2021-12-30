const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose);

const CountrySchema = new mongoose.Schema({
    name : { type: String },
    code : { type :String }
},{ versionKey: false });


//Will init the ID with auto-incremental
CountrySchema.plugin(AutoIncrement, { id: 'country_seq', inc_field:'country_id'});
const Country = mongoose.model('country', CountrySchema);
module.exports = Country;