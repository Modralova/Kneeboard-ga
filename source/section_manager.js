const XLSX = require('xlsx');
const fs = require('fs');



let routeGen = new Object();


routeGen.ROUTE = new Array();



routeGen.deleteROUTE = (orgURL) =>
{
   if(orgURL === "/NTP.hbs/sheet/delete" )

   console.log("---route erased")
 {
   routeGen.ROUTE = new Array();
   return;
 

 }


}


routeGen.setMap = (DATA,orgURL) => {

     


    let responder = new Object()
 
    routeGen.section = new Object()

    routeGen.section = {

      SECTION:`${DATA.inFrom} => ${DATA.inTo}`,
         NKDM: DATA.outNKDM,
         TIME: DATA.outT,
     DISTANCE: DATA.inS,
           KZ: DATA.outKZ,
           KM: DATA.outKM

    }
        
    
   if (!(routeGen.ROUTE.some(item => item.SECTION === `${DATA.inFrom} => ${DATA.inTo}`))) {

              
     

      routeGen.ROUTE.push(routeGen.section);


         responder.status = 200
         responder.message = `Section ${routeGen.section.SECTION} written` 

         console.log("POST:", routeGen.ROUTE);

            return responder;

   } else {

      switch (orgURL) {

         case "/NTP.hbs/calc":


            responder.status = 202
            responder.message = `Section ${routeGen.section.SECTION} already exists. Whish to update?` 

            return responder;

      
         case "/NTP.hbs/calc/over":


         let INDEX = routeGen.ROUTE.indexOf(routeGen.ROUTE.find(item => item.SECTION === `${DATA.inFrom} => ${DATA.inTo}`))
         routeGen.ROUTE[INDEX] = routeGen.section;

            responder.status = 201
            responder.message = `Section ${routeGen.section.SECTION} updated!` 

            return responder;

         
      }
   }
}




module.exports = routeGen;







