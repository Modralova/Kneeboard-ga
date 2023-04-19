
import {NTP} from '../NTP.js';


export function router(res,message){


    console.log("router",res);

  switch(res.status){


    case 200||201||422||500: alertBox(res,message); break;

    case 202:   confirmBox(res,message); break;
 }


}



 function alertBox (res,message)  {


    let aBox = document.createElement("div")
    aBox.classList.add("aBox");
    aBox.id = "aBox";
    document.querySelector("body").appendChild(aBox);


  
    let Alert = document.createElement("div");
    
    switch(res.status){

        case 200: Alert.classList.add("alert", "success"); break;
        case 201: Alert.classList.add("alert", "info"); break;
        case 202: Alert.classList.add("alert"); break;
        case 422: Alert.classList.add("alert", "info"); break;
        case 500: Alert.classList.add("alert"); break;
    }
    
    
    document.querySelector(".aBox").appendChild(Alert);
    
    
    let span = document.createElement("span");
    span.classList.add('closebtn');
    span.onclick = function(){
      var div = this.parentElement;
      div.style.opacity = "0";
      setTimeout(function(){ div.style.display = "none"; }, 600);
    
      Alert.remove();
     // window.location.reload(true);
    }
    
    document.querySelector(".alert").appendChild(span);
    
    document.querySelector(".closebtn").appendChild(document.createTextNode('\u2715'))
    
    document.querySelector(".alert").appendChild(document.createTextNode(Object.values(message)));
     
    
    }


     function confirmBox(res,message){

      


      let confBox = document.createElement("div");
      confBox.classList.add("confBox");
      confBox.id = "confBox";

      document.querySelector("body").appendChild(confBox);


      let confirm = document.createElement("div");
      confirm.id = "confirm"
      confirm.classList.add("confirm", "success");
      document.querySelector(".confBox").appendChild(confirm);

      
      let discr = document.createElement("div");
      discr.classList.add("discr");
      discr.id = "discr";
      document.querySelector(".confirm").appendChild(discr);

      

      let text = document.createElement("p");
      text.id = "confirm_text"
      
      document.querySelector(".discr").appendChild(text);
      document.querySelector("#confirm_text").appendChild(document.createTextNode(Object.values(message)))


      let keys = document.createElement("div");
      keys.classList.add("keys")
      document.querySelector(".confirm").appendChild(keys);

      let cancelBtn = document.createElement("button");
      cancelBtn.id = "cancelBtn";
      cancelBtn.classList.add("btns")
      cancelBtn.setAttribute("type", "button");
      cancelBtn.onclick = () => { confBox.remove()}
      document.querySelector(".keys").appendChild(cancelBtn);

      document.querySelector("#cancelBtn").appendChild(document.createTextNode('cancel'))


      let okBtn = document.createElement("button");
      okBtn.id = "okBtn";
      okBtn.classList.add("btns")
      okBtn.setAttribute("type", "button");
      okBtn.onclick  = () => {


            let RESPONSE;       
         
         
            
         
            NTP.URLover = window.location.href + "/calc/over";
         
            console.log("UPDATE", NTP.URLover )
         
         
               fetch(NTP.URLover,{
                  method: "PUT",
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
         
                confBox.remove()
         }
        




         document.querySelector(".keys").appendChild(okBtn);

         document.querySelector("#okBtn").appendChild(document.createTextNode('update'))

      

        


    }




    