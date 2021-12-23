const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const UserSchema = new mongoose.Schema({
    username : { type: String },
    password: { type: String }
},{ versionKey:false });

// Will init the ID with auto-incremental
UserSchema.plugin(AutoIncrement, {id:'user_seq', inc_field: 'user_id'});
const User = mongoose.model('User', UserSchema)
module.exports = User;