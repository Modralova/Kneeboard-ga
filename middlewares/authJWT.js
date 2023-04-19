const jwt = require("jsonwebtoken");
User = require("../models/User_Schema");
require('dotenv').config({ path: '.env' });






const verifyToken = (req, res, next) => {


  

      const { JWT } = req.params


      if (!JWT) {
        return res.status(422).send({ 
             message: "Missing Token" 
        });
    }

if(JWT) {

  console.log( "req.params.token: ",req.params.JWT)


    jwt.verify(JWT, process.env.API_SECRET, function (err, decode) {
  
      console.log("decode.id:",decode.id)

      User.findOne( { _id: decode.id},  (err, user) => {

        if (err) {
          res.status(500).send({ message: err });
          return;


        } else {

          
   

        }

        if (!user) {
          res.status(403).send({ message: "Invalid JWT token" });
          return;
        }


       



        if (user) {

            console.log("I've found user!")

          User.updateOne({ _id: decode.id }, { $set: { veryfied: true }},  (err, doc) => {  

            console.log("DOC: --->>> ",doc);
          

           //   res.status(200).send({message: "email address veryfied"});

                
            if (err) return res.send(500, { error: err });



          });

              req.user = user;

                    next()
          
        }


        else {

          req.user = undefined;


          res.status(403).send({ message: "Denied" });



           next()


        }

      })

    });

  } else {

    req.user = undefined;
     
    next()

   // res.status(403).send({ message: "Missing token" });
  }

};


module.exports = verifyToken;