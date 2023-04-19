var Planes = require("../models/plane_schema");
require('dotenv').config({ path: '.env'});
var Record = require("../models/Schema");
var User = require("../models/User_Schema");
var coconv = require("../source/coconv")
var assert = require('assert');
var ConvertDMSToDD = coconv.ConvertDMSToDD;




exports.getPlanes = (req, res) => { Planes.find({},{_id:0, operator: 0}, function(err, planes) { res.json(planes);  }) };



exports.loadRecord = (req, res) => { 
  
  
  
  Record.findOne(req.body, {_id: 0, __v: 0, location:0}, function(err, records) {console.log("records: ",records); res.json(records); }) };


  exports.deleteRecord = (req, res) => { 
  
  
  Record.deleteOne({navpoint: req.body.navpoint}, function(err, infos) {console.log("infos: ",infos); 
  
  
    if (err) res.json(err);
    
            else res.json({message : "record succesfully removed!",
            infos}); 
          
          }) 


};



exports.saveRecord = (req, res) => {


  

  console.log(req.body);


  Record.findOne({ navpoint: req.body.navpoint }, function (err, isRecord) {


    if (isRecord) {

      return res.status(422).send({ message: "The navpoint already exists in the database." })

    } else {
        
      
          
      const record = new Record({

         
        navpoint: req.body.navpoint,
        location: { type: "Point", name: req.body.navpoint, coordinates: ConvertDMSToDD(req.body.coords) },
        coords: req.body.coords,
        elevation: req.body.elevation,
        rwy_1: req.body.rwy_1,
        rwy_2: req.body.rwy_2,
        rwy_1_dimentions: req.body.rwy_1_dim,
        rwy_2_dimentions: req.body.rwy_2_dim,
        frequency_1: req.body.frequency_1,
        frequency_2: req.body.frequency_2,
        frequency_3: req.body.frequency_3,
        callsign_1: req.body.callsign_1,
        callsign_2: req.body.callsign_2,
        callsign_3: req.body.callsign_3,
        fuel_1: req.body.fuel_1, 
        fuel_2: req.body.fuel_2
        
      })

      console.log("record: ", record)

      record.save((err, record) => {
        if (err) { res.status(500).send({ message: err }); return; }
        else { res.status(200).send({ message: "Record saved successfully!" }) }
      });

    }

  }

  )
}
