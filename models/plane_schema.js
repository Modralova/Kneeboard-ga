var mongoose = require('mongoose');
require('dotenv').config({ path: '.env'});



let planeSchema = new mongoose.Schema({



sign: {type: String, required: [true, "e.g SP-ABC"]},
operator: String,
type: { type: String, enum:["AT-3","C-152"], required: [true, "AT-3 or C-152"]},
Qp: {type: String, required: [true, "385_kg or 1650_lbs"]},
Mp: {type: String, required:[true, "86.09_kgm or 36.808_lbsin"]},
Qmax: {type: String, required: [true, "650_kg or 1670_lbs"]}






},{ collection: "Planes"})


module.exports = mongoose.model('Plane', planeSchema);
