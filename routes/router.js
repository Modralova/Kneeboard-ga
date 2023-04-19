
const express = require('express');
//var corsMiddleware = require('../cors.js')
const router = express.Router();
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
require('dotenv').config({ path: '.env' });



const verifyToken = require('../middlewares/authJWT');
const { signup, signin, resetPassword, requestReset } = require("../controller/auth.controller.js");
user = require("../models/User_Schema.js");


//const dBaseManager = require('../source/dBase_manager.js')      //obsługa lokalnego pliku json
//const recordWriter = dBaseManager.writeRecord;


const dBaseManager = require("../controller/dBASE_manager.js")  // mongoDB AWS
const saveRecord = dBaseManager.saveRecord;
const loadRecord = dBaseManager.loadRecord;
const deleteRecord = dBaseManager.deleteRecord;
const getPlanes = dBaseManager.getPlanes;




const getInstrumentimage = require('../source/instrument.js');

const jsSheetManager = require('../source/jsSheet_manager.js')
const xlsManager = jsSheetManager.xlsManager;

const sectionManager = require('../source/section_manager.js');
const { MongoDBNamespace } = require('mongodb');
const setMap = sectionManager.setMap;
const deleteROUTE = sectionManager.deleteROUTE;

const Logged = (req, res, next) => {

      if (req.session.logged) {

            next();

      } else {
            res.redirect('/');

      }

}



var DATE = new Date();
let timestamp = `${DATE.toLocaleDateString().replace(/[\.?]/g, "")}${DATE.toLocaleTimeString().replace(/[:?]/g, "")}`




/*
router.route("/:id")
.get((req,res) =>{})  
.post((req,res) =>{})                                
.put((req,res) =>{})
.patch((req,res) =>{})   
.delete((req,res) =>{})      
*/


/*BRIEFING */



router.get('/', (req, res) => {

            res.render('home.hbs', {

                  logged: req.session.logged,
                  title: process.env.SITE_NAME
            })

});





router.post("/login", signin, function (req, res) {


      if (req.user.passed && req.user.veryfied) {


            req.session.logged = req.user.passed;
            req.session.role = req.user.role
            req.session.save()

      }

      console.log("req.session/login: ------------>", req.session)

})



router.get("/register", (req, res) => {

      res.render('register');
});



router.get("/reset/:JWT", verifyToken, (req, res) => {

      if (req.user != undefined) {

            console.log("REQ.user.email: ", req.user.email);


            res.render('reset');
      }

      else { res.status(403).send({ message: "Denied" }); }

});




router.post("/reset/:JWT/reset", resetPassword, (req, res) => {});




router.get("/request", (req, res) => {

      res.render("request.hbs")

});



router.post("/request/passwordreset", requestReset, (req, res) => {});




router.get('/logout', (req, res) => {


      req.session.destroy();
      console.log("---loggedout: ",req)

      res.redirect('/NTP.hbs/sheet/delete')


});



router.post("/register/signup", signup, (req, res) => {});



router.get("/verify/:JWT", verifyToken, function (req, res) {

      // w przypadku braku moliwości mailowej weryfikacji - wykomentuj wiersz poniżej, aby odblokować strony
      if (req.user != undefined) { res.redirect('/'); }

      else { res.status(403).send({ message: "Denied" }); }


});




router.get('/forecast', /*corsMiddleware*/  async (req, res) => {

      res.body = await fetch('https://awiacja.imgw.pl/getsigmet/metar.json', { method: "GET" })
            .then(response => { return response.json(); })
            .then(data => { let array = data; return array; })

      console.log("--forecast---->: ", res.body);

      res.status(200).send(res.body);

})





/* dBASE */

router.get('/dBase.hbs', Logged, (req, res) => {

      res.render('dBase.hbs', { title: process.env.SITE_NAME })

});




router.post('/dBase.hbs/save', Logged, (req, res) => {

      if (req.session.role != "admin") {


            console.log("DENIED!")

            res.status(403).send({ message: "no permission" });

      } else { saveRecord(req, res) }

});




router.post('/dBase.hbs/load', Logged, loadRecord, (req, res) => {



      if (!req.session.logged) {

            res.redirect('home.hbs');
      }


});




router.post('/dBase.hbs/delete', Logged, (req, res) => {

      if (!req.session.logged) {

            res.redirect('home.hbs');
      }
      if (req.session.role != "admin") {


            console.log("DENIED!")

            res.status(403).send({ message: "no permission" });

      } else { deleteRecord(req, res) }

});



/*NTP */

router.get('/NTP.hbs', Logged, (req, res) => {


   res.render('NTP.hbs', { title: process.env.SITE_NAME })

});


router.get('/NTP.hbs/sheet', Logged, (req, res) => {


      res.statusCode = 200;
      res.setHeader('Content-Disposition', `attachment; filename="ROUTE_${xlsManager().timestamp}.xlsx"`);
      res.setHeader('Content-Type', 'application/vnd.ms-excel');
      res.send(xlsManager().buffer);

      deleteROUTE(req.originalUrl);

});

router.get('/NTP.hbs/sheet/delete', (req, res) => {


      deleteROUTE(req.originalUrl);
      console.log("---sheet deleted")

      res.redirect('/NTP.hbs');
});


router.post('/NTP.hbs/calc', Logged, (req, res) => {


      let responder = setMap(req.body, req.originalUrl);

      res.status(responder.status).send({ message: responder.message });
});



router.put('/NTP.hbs/calc/over', Logged, (req, res) => {


      let responder = setMap(req.body, req.originalUrl);

      res.status(responder.status).send({ message: responder.message });

});



/* LOAD */



router.get('/LOAD.hbs', Logged, (req, res) => {

      if (req.session != undefined || req.session != null) {

            if (req.session.logged) {

                  res.render('LOAD.hbs', { title: process.env.SITE_NAME })

            } else {
                  res.redirect('/')
            };
      } else {
            res.redirect('/');
      }

});




router.get('/LOAD.hbs/planes', Logged, getPlanes, (req, res) => {});








module.exports = router;




