
import * as fLOAD from "./source/LOAD_functions.js"


let LOAD = new Object();

LOAD.IDs = ['type','Qmax','Qp','Mp','Qf','Mf','Qcr','Mcr',
'Qlg','Mlg','Q','M','Agc','Adc','fuel','flBTN','lbsBTN',
'countBTN','list','kg','kgm','wdw_kg','wdw_kgm']


    for (const ID of  LOAD.IDs[Symbol.iterator]() ) 
{LOAD[`${ID}`] = document.getElementById(`${ID}`); 
//console.log(LOAD[`${ID}`])}
}



// * utworzenie listy samolotów

LOAD.planes = new Array();
// pobieranie z bazy danych
LOAD.planes = await  fetch(window.location.href + "/planes")
.then(response => { return response.json();})
.then(data => { let array = data; return array;})



// pole startowe listy samolotów
let znaki = document.createElement("option");
znaki.text  = '-sign-';
znaki.value = '-sign-';
LOAD.list.appendChild(znaki); 


 // utworzenie listy samolotów z dnych pobranych z bazy
for (const plane of  LOAD.planes[Symbol.iterator]() ) 
{
    let option = document.createElement("option");
    option.text  = `${plane.sign}`;
    option.value = `${plane.sign}`;
    LOAD.list.appendChild(option); 
    
}

// *

// nodelisty dla zmiany jednostek
for(let i =1; i<5; i++)
   { LOAD[`${LOAD.IDs.at( - `${i}`)}`] = document.querySelectorAll(`.${LOAD.IDs.at( - `${i}`)}`)} // lbs_km



// zmiana jednostek w reakcji na dane
LOAD.list.addEventListener('change', () => {

if(LOAD.planes.find( plane => (plane.sign === LOAD.list.value)).Qmax.includes('lbs') && LOAD.lbsBTN.textContent != "Lbs") 

   LOAD.lbsBTN.click();

if(LOAD.planes.find( plane => (plane.sign === LOAD.list.value)).Qmax.includes('kg') && LOAD.lbsBTN.textContent != "kg")  

   LOAD.lbsBTN.click();


for(let i = 0; i<4; i++)// pobieranie wartości pól tablicy do texteditów
    LOAD[`${LOAD.IDs[i]}`].value = LOAD.planes.find( plane => (plane.sign === LOAD.list.value))[`${LOAD.IDs[i]}`].replace(/_\w+/, "") 

})





LOAD.fuel.addEventListener('input', () => {

    let fArm__ ;

    if(LOAD.type.value == 'AT-3') fArm__ = - .0257
    if(LOAD.type.value == 'C-152') fArm__ = ""
    
      if(LOAD.lbsBTN.value == "true")

         LOAD.Qf.value = fLOAD.kgToLbs(LOAD.fuel.value * .721); 
         else
         LOAD.Qf.value = LOAD.fuel.value*.721; 

       

      if(LOAD.flBTN.value == 'Gl.')
      {LOAD.Qf.value = fLOAD.galtoL(LOAD.fuel.value * .721)}


      LOAD.Mf.value = LOAD.Qf.value * fArm__;

})



LOAD.Qcr.addEventListener('input', () => {

    let crArm__;

    if(LOAD.type.value == 'AT-3') crArm__ = .6
    if(LOAD.type.value == 'C-152') crArm__ = ""



    if(LOAD.lbsBTN.value == 'true')
    LOAD.Mcr.value = fLOAD.kgToLbs(LOAD.Qcr.value * crArm__)
    else
    LOAD.Mcr.value = LOAD.Qcr.value * crArm__;



})

LOAD.Qlg.addEventListener('input', ()=>{

    let lgArm__;

    if(LOAD.type.value == 'AT-3') lgArm__ = 1.125
    if(LOAD.type.value == 'C-152') lgArm__ = ""

    

    if(LOAD.lbsBTN.value == "true")
    LOAD.Mlg.value = fLOAD.kgToLbs(LOAD.Qlg.value * lgArm__)
    else
    LOAD.Mlg.value = LOAD.Qlg.value * lgArm__;

})


// konwersja lbs <=> kg, lbs/in <=> kg/m
LOAD.lbsBTN.addEventListener('click',()=>{


      switch(LOAD.lbsBTN.textContent){

          case('kg'):

          LOAD.lbsBTN.textContent = "Lbs";
          LOAD.lbsBTN.value = "true";
          LOAD.kg.forEach((text,i)=>{   text.textContent = "Lbs"})
          LOAD.kgm.forEach((text,i)=>{   text.textContent = "Lbs/in"})
          
          LOAD.wdw_kg.forEach((weight,i) =>{ weight.value = fLOAD.kgToLbs(weight.value)})
          LOAD.wdw_kgm.forEach((torque,i) =>{ torque.value = fLOAD.kgmToLbsin(torque.value)})   

          break;

          case('Lbs'):

          LOAD.lbsBTN.textContent = "kg";
          LOAD.lbsBTN.value = "false";
          LOAD.kg.forEach((text,i)=>{   text.textContent = "kg"})
          LOAD.kgm.forEach((text,i)=>{   text.textContent = "kg/m"})

          LOAD.wdw_kg.forEach((weight,i) =>{weight.value = fLOAD.lbsToKg(weight.value)})
          LOAD.wdw_kgm.forEach((torque,i) =>{torque.value = fLOAD.lbsinToKgm(torque.value)})   

          break;

      }

    })




LOAD.flBTN.addEventListener("click",  () => {      

    if (LOAD.fuel.value != "" && !isNaN(LOAD.fuel.value)) {
       
 
    
       let F__  = parseFloat(LOAD.fuel.value);
       let Qf__ = parseFloat(LOAD.Qf.value);
 
 
       switch (LOAD.flBTN.textContent) {
 
          case "l.":
 
            LOAD.fuel.value = fLOAD.lToGal(F__)//.toFixed(3);   
 
            LOAD.flBTN.textContent = "Gl.";
            LOAD.flBTN.value = "Gl.";
             
 
             if (Qf__ != "") {
 
               LOAD.Qf.value = Qf__//.toFixed(3);
             }
 
             break;
 
          case "Gl.":
 
            LOAD.fuel.value = fLOAD.galToL(F__)//.toFixed(3);
 
           LOAD.flBTN.textContent = "l.";
           LOAD.flBTN.value = "l.";
             
 
             if (Qf__ != "") {
 
                LOAD.Qf.value = Qf__//.toFixed(3);
             }
       }
 
    }
 
 })


 LOAD.countBTN.addEventListener('click', ()=>{


    let v = new Object();

    let dc; 

    if(LOAD.type.value == 'AT-3') dc = 1.27 //mean aerodynamic chord
    if(LOAD.type.value == 'C-152') dc = ""  



    
    for(let i = 2; i<10; i++){

         v[`${LOAD.IDs[i]}`] = parseFloat(LOAD[`${LOAD.IDs[i]}`].value)

    } 
   
    let Q = v.Qp + v.Qf + v.Qcr + v.Qlg
    let M = v.Mp + v.Mf + v.Mcr + v.Mlg  

    let Agc = (M / Q).toFixed(3)
    let Adc = (Agc / dc * 100).toFixed(0)
        

   
    if(LOAD.type.value == 'AT-3'){

        LOAD.Q.value = Q;
        LOAD.M.value = M;
        LOAD.Agc.value = Agc
        LOAD.Adc.value = Adc

    }
    
    

 })


































    









