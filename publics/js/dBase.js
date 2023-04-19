import  {alertBox, confirmBox}  from "./boxes/dBase_boxes.js";



export let dBASE = new Object();

dBASE.DATA = new Array();

dBASE.user = false;

dBASE.saveURL = window.location.href + "/save"
dBASE.loadURL = window.location.href + "/load"
dBASE.deleteURL = window.location.href + "/delete"




dBASE.IDs = ['fields', 'values', 'addFieldBTN','rmFieldBTN','saveBTN','loadBTN','delBTN'];


for (const ID of dBASE.IDs[Symbol.iterator]()) {
  dBASE[`${ID}`] = document.getElementById(`${ID}`);
  //console.log(LOAD[`${ID}`])}
}



let FIELD_INDEX = 0;



dBASE.field_names = ['navpoint', 'coords', 'zone', 'rwy_1', 'rwy_2', 'rwy_3', 'elevation', 'rwy_1_dimentions',
  'rwy_2_dimentions', 'rwy_3_dimentions', 'surface_1', 'surface_2', 'surface_3', 'frequency_1', 'frequency_2',
  'frequency_3', 'callsign_1', 'callsign_2', 'callsign_3','fuel_1','fuel_2','fuel_3', 'phone_1', 'phone_2', 'phone_3'];



function createField() {

  // utworzenie listy 
  dBASE[`list${FIELD_INDEX}`] = document.createElement("select");
  dBASE[`list${FIELD_INDEX}`].id = `list${FIELD_INDEX}`
  dBASE[`list${FIELD_INDEX}`].name = dBASE.IDs[0] //fields

  // dodanie listy do kontenera
  document.querySelector('.it3').appendChild(dBASE[`list${FIELD_INDEX}`]);



  // utworzenie pola formularza
  dBASE[`input${FIELD_INDEX}`] = document.createElement("input");
  dBASE[`input${FIELD_INDEX}`].id = `input${FIELD_INDEX}`
  dBASE[`input${FIELD_INDEX}`].name = dBASE.IDs[1] // values

  // dodanie listy do kontenera
  document.querySelector('.it3').appendChild(dBASE[`input${FIELD_INDEX}`]);
  



  // pole startowe
  let fld = document.createElement("option");
  fld.text = '-field-';
  fld.value = '-field-';
  dBASE[`list${FIELD_INDEX}`].appendChild(fld);

  // dodanie do listy pozostałych pól wg. nazw z tablicy dBASE.field_names
  for (const fld of dBASE.field_names[Symbol.iterator]()) {
    let option = document.createElement("option");
    option.text = `${fld}`;
    option.value = `${fld}`;
    dBASE[`list${FIELD_INDEX}`].appendChild(option);
  }


  // dodanie atrybutu name do fields and values
  for (let i = 0; i < 2; i++) { dBASE[`${dBASE.IDs[i]}`] = document.querySelectorAll(`[name="${dBASE.IDs[i]}"]`) }

  //console.log("dBASE.values",dBASE.values);
};




//dBASE[`list${FIELD_INDEX}`].addEventListener('change', () => { FIELD_INDEX++;  createList(); });   ///??? 


dBASE.addFieldBTN.addEventListener('click', () => {

  createField(); FIELD_INDEX++

})



dBASE.saveBTN.addEventListener('click', () => {

  let record = new Object();

  

  dBASE.values.forEach((v, i) => { record[`${dBASE.fields[i].value}`] = v.value })

  console.log("dBASE.values",dBASE.values);
  console.log("Object.values(dBASE)",Object.values(dBASE));
  

  dBASE.DATA.push(record);

  
  console.log("dBASE.DATA  : ",dBASE.DATA )

  console.log("record",record);


  let RESPONSE;       

  fetch(dBASE.saveURL, {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(record)


  }).then(response => { RESPONSE = response     
      if (response.ok) {

         return RESPONSE.json()

      } else{

        return RESPONSE.json()

      }

    })
    
    .then(message  =>  alertBox(RESPONSE.status,message))
    .catch(err => {console.log(err); });


   dBASE.DATA = new Array();
   record = new Object();

  

})


dBASE.loadBTN.addEventListener("click", () =>{

  let request = new Object();

  let RESPONSE;   

  dBASE.values.forEach((v, i) => { request[`${dBASE.fields[i].value}`] = v.value })

  fetch(dBASE.loadURL, {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request)


  }).then(response => { RESPONSE = response     
      if (response.ok) {

         return RESPONSE.json()

      } else{

        return RESPONSE.json()

      }

    })
    
    .then(props  =>  createForm(RESPONSE.status,props))
    .catch(err => console.log(err));

   
    function createForm(res, props){


      console.log ("res: ",res)
      console.log ("JSON.stringify(props): ", JSON.stringify(props))
      console.log (" Object.keys(props): ", Object.keys(props))
      console.log ("Object.values(props): ", Object.values(props))
      console.log("props.entries",  Object.entries(props))

//console.log("  : ", )
      
  delete props[dBASE.list0.options[dBASE.list0.selectedIndex].value]

   console.log("dBASE.list0.options[dBASE.list0.selectedIndex].value:",dBASE.list0.options[dBASE.list0.selectedIndex].value)

                   console.log("props: ",props);


     for (const [key, value] of Object.entries(props)) {
      
       createField();

       dBASE[`list${FIELD_INDEX}`].selectedIndex = dBASE.field_names.indexOf(key)+1;
       dBASE[`input${FIELD_INDEX}`].value = value;
       
     }

    }

    

})




dBASE.delBTN.addEventListener("click", () =>{

  

   let message = "This operation will remove mached record from the database. Would you like to continue?"

   dBASE.request = new Object();

   dBASE.values.forEach((v, i) => { dBASE.request[`${dBASE.fields[i].value}`] = v.value })

   
    confirmBox(message)

 
})

  


 















