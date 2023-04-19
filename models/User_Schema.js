var mongoose = require('mongoose');
require('dotenv').config({ path: '.env'});
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");



var mainSchema = new mongoose.Schema({
    // _id: mongoose.Schema.Types.ObjectId,
name : { type: String, 
         required: [true, "name"] },
surname : { type: String, 
            required: [true, "surname"], },    
email: { type: String,
         uniqe: [true, "email already exists here"],
         lowercase: true,
         trim: true,
         required: [true, "no email provided"],
         validate: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }, 
                   message: '{v} is not valid email!',
            
},
veryfied: {type: Boolean, 
           required: true, 
           default: false
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
    required: [true, "role"]
}



},{ collection: "Users"});


mainSchema.methods.generateJWT = function(){

    const user = this;

    const Token = jwt.sign({id: user._id}, process.env.API_SECRET,{expiresIn: "7d"})


    console.log("user.email:",user._id)
    console.log("veryficationToken:",Token)

    


    return Token;
}




module.exports = mongoose.model('User', mainSchema);