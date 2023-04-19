var mongoose = require('mongoose');
require('dotenv').config({ path: '.env'});



var mainSchema = new mongoose.Schema({

name : { type: String, required: [true, "name"], },
surname : { type: String, required: [true, "surname"], },    
email: { type: String,
uniqe: [true, "email already exists here"],
lowercase: true,
trim: true,
required: [true, "no email provided"],
validate: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);}, message: '{v} is not valid email!'},


role: {
    type: String,
    enum: ["normal", "admin"],
    required: [true, "specify user role"]
}, 
password: {
    type: String,
    required: true
    

},
created:{
    type: Date,
    defoult: Date.now
},
role:{
    type: String,
    enum: ["admin", "user"],
    required: [false, "role"]
}

},{ collection: process.env.COLL_4});

module.exports = mongoose.model('User', mainSchema);