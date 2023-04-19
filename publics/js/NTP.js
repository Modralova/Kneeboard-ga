
import * as fNTP from "./source/NTP_functions.js";
import  {router}  from "./boxes/ntp_boxes.js";




export let NTP = new Object();



NTP.IDs = ["inFrom","inTo","inDelM","inDelB","inDM","inU","inNKDG","inV","inS","outDN","outKW","outNKDM",
"outKB","outKZ","outKM","outW","outVmin","outT","canvas","convBTN","ConvText",'countBTN','appendBTN','saveBTN','eraseBTN'];






for (const ID of  NTP.IDs[Symbol.iterator]() ) 
    NTP[`${ID}`] = document.getElementById(`${ID}`); 


NTP.context = NTP.canvas.getContext("2d");

NTP.convBTN.value = true;

NTP.r = NTP.canvas.height / 2;

NTP.img = new Image();
NTP.img.src = "/images/instrument.png"



NTP.img.onload = function () {


   NTP.context.fillStyle = "white";
   NTP.context.fillRect(0, 0, NTP.canvas.width, NTP.canvas.height);
   NTP.context.drawImage(NTP.img, 0, 0, NTP.canvas.width, NTP.canvas.height);

}


const HTTP = new XMLHttpRequest();


// blokada countBTN
Object.values(NTP).slice(3, 19).forEach((v, i) => {
   v.addEventListener('focus', () => {                                           
      NTP.countBTN.value = "false"
   })
})


// pobieranie pliku xml
NTP.saveBTN.addEventListener("click", function () {


   NTP.URLsheet = window.location.href + "/sheet";

   location.href = NTP.URLsheet;

})



// gdy countBTN odblokowany - licz
NTP.countBTN.addEventListener("click",  () => {

   if (Object.values(NTP).slice(3, 10).every((v, i) => { NTP.countBTN.value = "true"; return v.value != ""; })) 

   fNTP.count();

})



NTP.appendBTN.addEventListener("click",  () => {

  NTP.payloadJSON = new Object();


   if (Object.values(NTP).slice(1, 19).every((v, i) => { if ( NTP.countBTN.value == "true") return v.value != ""; })) {

      Object.values(NTP).slice(1, 19).forEach((v, i) => { NTP.payloadJSON[`${v.id}`] = v.value });

      console.log(JSON.stringify(NTP.payloadJSON));



      NTP.URLcalc = window.location.href + "/calc";          ///////POST

      
      let RESPONSE;       

      fetch(NTP.URLcalc,{
         method: "POST",
         headers: {'Content-Type': 'application/json'},
         body: JSON.stringify(NTP.payloadJSON) 
       })
       
       .then(res =>{ RESPONSE = res
         
         
         if(res.ok){

         return res.json()
         
          }else{ 
            
            return res.json()}})
       .then(msg => router(RESPONSE,msg))
       .catch(err => console.log(err));

   }
})





NTP.convBTN.addEventListener("click",  () => {      // konwersja S

   if (NTP.inS.value != "" && !isNaN(NTP.inS.value)) {

        if( NTP.convBTN.value == 'true')
           {NTP.convBTN.value = 'false';
         
         }else{
            
            NTP.convBTN.value = 'true';}


      


      var S__ = parseFloat(NTP.inS.value);
      var S_min = NTP.outVmin.value;


      switch (NTP.convBTN.textContent) {

         case "nm":

            NTP.inS.value = fNTP.milesToKm(S__);

            NTP.convBTN.textContent = "km";
            NTP.ConvText.textContent = "km";

            if (S_min != "") {

               NTP.outVmin.value = fNTP.milesToKm(S_min).toFixed(1);
            }

            break;

         case "km":

            NTP.inS.value = fNTP.kmetersToNM(S__);

            NTP.convBTN.textContent = "nm";
            NTP.ConvText.textContent = "nm";

            if (S_min != "") {

               NTP.outVmin.value = fNTP.kmetersToNM(S_min).toFixed(1);
            }
      }

   }

})

NTP.eraseBTN.addEventListener("click",  () => {


   NTP.URLsheetdelete = window.location.href + "/sheet/delete";

   location.href = NTP.URLsheetdelete;

   



   

})


  






