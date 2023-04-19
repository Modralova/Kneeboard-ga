var mongoose = require('mongoose');







const pointSchema = new mongoose.Schema({

    name: String,

    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
   
  });
  






  module.exports = mongoose.model('Navpoint', pointSchema);