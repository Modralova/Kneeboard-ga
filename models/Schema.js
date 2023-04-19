var mongoose = require('mongoose');
require('dotenv').config({ path: '.env'});


 


let schema = new mongoose.Schema({

navpoint: {type: String, required: [true, "ICAO code of the airfield or navpoints name e.g. ZULU"]},
coords: {type: String, required: [true, "e.g. 52°16'09''N 020°54'26''E"], 
validate: { validator: function (v) 
{ 
    const Reg =(/^(\d{1,2})°{1}(\d{2})'{1}(\d{2})(\.[0-9])?'{2}[NS]{1}\s(\d{3})°{1}(\d{2})'{1}(\d{2})(\.[0-9])?'{2}[WE]{1}$/)

    let coor =   Reg.test(v);
    let lat_deg =  parseInt(RegExp.$1)
    let lat_min =  parseInt(RegExp.$2)
    let lat_sec =  parseInt(RegExp.$3)
    let lon_deg =  parseInt(RegExp.$5)
    let lon_min =  parseInt(RegExp.$6)
    let lon_sec =  parseInt(RegExp.$7)
    
    latDeg = (lat_deg) =>  { return  0 <=  lat_deg && lat_deg <= 90 };
    lonDeg = (lon_deg) =>  { return  0 <=  lon_deg && lon_deg <= 180};

    LX = (lx) => {return 0 <= lx && lx <= 60}

    return coor && latDeg(lat_deg) && lonDeg(lon_deg) && LX(lat_min) && LX(lat_sec) && LX(lon_min) && LX(lon_sec) ;

    }, message: v => `${v.value} are incorrect`}},



location: {
    type: {
      type: String, 
      enum: ['Point'], 
      required: true
    },
    name: String,
    coordinates: {
      type: [Number],
      required: true,
      lowercase: true
    }
  },


elevation: {type: String, required:            [false, "e.g. 348ft"]},
rwy_1: {type: String, required:                [false, "e.g. 10R/28L or 10/28"]},
rwy_2: {type: String, required:                [false, "e.g. 10R/28L or 10/28"]},
rwy_1_dimentions:{type: String, required:      [false, "e.g. 1301x90"]},
rwy_2_dimentions:{type: String, required:      [false, "e.g. 1301x90"]},
frequency_1: { type: String, required:         [false, "e.g. 119.180"]},
frequency_2: { type: String, required:         [false, "e.g. 119.180"]},
frequency_3: { type: String, required:         [false, "e.g. 119.180"]},
callsign_1:{type: String, required:            [false, "e.g. Babice Info"]},
callsign_2:{type: String, required:            [false, "e.g. Babice Info"]},
callsign_3:{type: String, required:            [false, "e.g. Babice Info"]},
fuel_1: {type: String, required:               [false, "e.g. AVGAS 100LL"]},
fuel_2: {type: String, required:               [false, "e.g. Jet A-1"]}



},{ collection: "Navpoints"})


module.exports = mongoose.model('Record', schema);