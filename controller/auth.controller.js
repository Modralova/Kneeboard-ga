
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
var User = require("../models/User_Schema");
var sendEmail = require('../source/email_manager.js')
require('dotenv').config({ path: '.env' });
const verifyToken = require('../middlewares/authJWT')



exports.resetPassword = (req, res) => {


  verifyToken(req, res, () => {

    User.findOne({ _id: req.user._id }, function (err, user) {


      if (user) {

        if (req.body.new == req.body.confirm) {

          User.updateOne({ _id: user._id }, { password: bcrypt.hashSync(req.body.new, 8) }, (err, doc) => {

            console.log("DOC: ", doc);

            if (err) return res.send(500, { error: err });

           

            return res.status(200).send({ message: "Password has been reset" })

           

          })


        } else {

          return res.status(401).send({ message: "Invalid Password!" });

        }

      } else {


        return res.status(404).send({ message: "User Not found." })

      }

    })


  })

};


exports.requestReset = (req, res) => {

  

  User.findOne({ email: req.body.email }, function (err, user) {

    if (user) {

      console.log("FOUND USER WITH _uid: ", user._id)


      var JWT = jwt.sign({ id: user._id }, process.env.API_SECRET, { expiresIn: 86400 });

      sendEmail(req, user.name, user.email, JWT, "reset")
        .then(result => console.log("EMAIL has been sent", result))
        .catch(err => console.log("EMAIL_ERROR: ", err));

      return res.status(200).send({ message: "Email containing request link has been sent" })

    } else {

      url = process.env.BASE_URL + "/register"
         
      return res.status(422).send({ message: "Sorry, you dont'have accaount yet. Please " + `<a href = '${url}'>register</a>` + " first." })

    }

  })
} /////end



exports.signin = (req, res, next) => {






  User.findOne({ email: req.body.email }).exec((err, user) => {
    if (err) {
      res.status(500)
        .send({ message: err }); return
    }

    if (!user) {
      return res.status(404)
        .send({
          message: "User Not found."
        });
    }

    


    var passed = bcrypt.compareSync(req.body.password, user.password);


    if (!passed) {
      
      req.user = undefined; console.log("PASSWORD INVALID")

      return res.status(401).send({ message: "Invalid Password!" });

    } else {

      res.status(200)
        .send({
          user: {
            id: user._id,
            email: user.email,
            name: user.name,
            surname: user.surname,
            veryfied: user.veryfied
          },
          message: "Login successfull",
        });

      req.user = user;

      req.user.passed = passed;

      console.log('req.user:', req.user)

      next()
    }

  });


};



exports.signup = (req, res) => {

  

  User.findOne({ email: req.body.email }, function (err, isUser) {


    if (isUser) { return res.status(422).send({ message: "Occupied!" }) }



    else {

     //  sendEmail(user.email, accessToken)


      const user = new User({
        //_id: new mongoose.Types.ObjectId,
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        role: 'user'

      });



      user.save((err, user) => {
        if (err) { res.status(500).send({ message: err }); return; }
        else { res.status(200).send({ message: "Registration successful. Await confirmation email." }) }
      });


      const JWT = user.generateJWT();


      sendEmail(req, user.name, user.email, JWT, "verify")
        .then(result => console.log("EMAIL has been sent", result))
        .catch(err => console.log("EMAIL_ERROR: ", err));

    }

  }

  )
} /////end



exports.signin = (req, res, next) => {


  



  User.findOne({ email: req.body.email }).exec((err, user) => {
    if (err) {
      res.status(500)
        .send({ message: err }); return
    }

    if (!user) {
      return res.status(404)
        .send({
          message: "User Not found."
        });
    }



    var passed = bcrypt.compareSync(req.body.password, user.password);


    if (!passed) {
      
      req.user = undefined; console.log("PASSWORD INVALID")


      return res.status(401).send({ message: "Invalid Password!" });



    } else {

      res.status(200)
        .send({
          user: {
            id: user._id,
            email: user.email,
            name: user.name,
            surname: user.surname,
            veryfied: user.veryfied
          },
          message: "Login successfull",
        });

      req.user = user;

      req.user.passed = passed;

      console.log('req.user:', req.user)


      next()
    }

  });


};