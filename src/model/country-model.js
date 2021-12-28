const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose);

const CountrySchema = new mongoose.Schema({
    name : { type: String }
},{ versionKey: false });


//Will init the ID with auto-incremental
CountrySchema.plugin(AutoIncrement, { id: 'country_seq', inc_field:'country_id'});
const Country = mongoose.model('Country', CountrySchema);
module.exports = Country;