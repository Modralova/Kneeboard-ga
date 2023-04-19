
import {dBASE} from '../dBase.js';


export function alertBox (status,message)  {


  console.log("status: ", status)



  console.log ("JSON.stringify(message): ", JSON.stringify(message))
  console.log ("Object.keys(message): ", Object.keys(message))
  console.log ("Object.values(message): ", Object.values(message))
  
 


      let aBox = document.createElement("div")
      aBox.classList.add("aBox");
      aBox.id = "aBox";
      document.querySelector("body").appendChild(aBox);
  
  
    
      let Alert = document.createElement("div");
      
      switch(status){
  
          case 200: Alert.classList.add("alert", "success"); break;
          case 201: Alert.classList.add("alert", "info"); break;
          case 202: Alert.classList.add("alert"); break;
          case 422: Alert.classList.add("alert", "info"); break;
          case 403: Alert.classList.add("alert"); break;
          case 500: Alert.classList.add("alert"); break;
          case 'refuse': Alert.classList.add("alert"); break;
      }

      
    document.querySelector(".aBox").appendChild(Alert);

    

   let  msg =  document.createElement("p")
   msg.style="word-wrap:break-word; font-size: 12px; width: 250px;"
   msg.id = "aBox_msg"
   
    
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

    document.querySelector(".alert").appendChild(msg);
    //document.querySelector(".alert").appendChild(document.createTextNode(Object.values(message)));

    document.querySelector("#aBox_msg").appendChild(document.createTextNode(Object.values(message)));
     
    
    }



  export  function confirmBox(message){

      

      let confBox = document.createElement("div");
      confBox.classList.add("confBox");
      confBox.id = "confBox";

      document.querySelector("body").appendChild(confBox);


      let confirm = document.createElement("div");
      confirm.id = "confirm"
      confirm.classList.add("confirm");
      document.querySelector(".confBox").appendChild(confirm);

      
      let discr = document.createElement("div");
      discr.classList.add("discr");
      discr.id = "discr";
      document.querySelector(".confirm").appendChild(discr);

      

      let text = document.createElement("p");
      text.id = "confirm_text"
      
      document.querySelector(".discr").appendChild(text);
      document.querySelector("#confirm_text").appendChild(document.createTextNode(message))


      let keys = document.createElement("div");
      keys.classList.add("keys")
      document.querySelector(".confirm").appendChild(keys);


      let okBtn = document.createElement("button");
      okBtn.id = "okBtn";
      okBtn.classList.add("btns")
      okBtn.setAttribute("type", "button");
      okBtn.onclick  = () => {


        let RESPONSE;

        console.log("Object.values(dBASE.request): ",Object.values(dBASE.request) )
       
       
          fetch(dBASE.deleteURL, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dBASE.request)
        
        
          }).then(response => { RESPONSE = response     
              if (response.ok) {
        
                 return RESPONSE.json()
        
              } else{
        
                return RESPONSE.json()
        
              }
        
            })
            
            .then(props  =>  alertBox(RESPONSE.status,props))
            .catch(err => console.log(err));
       
              confBox.remove()
       }


      document.querySelector(".keys").appendChild(okBtn);

      document.querySelector("#okBtn").appendChild(document.createTextNode('YES'))

      let cancelBtn = document.createElement("button");
      cancelBtn.id = "cancelBtn";
      cancelBtn.classList.add("btns")
      cancelBtn.setAttribute("type", "button");
      cancelBtn.onclick = () => { confBox.remove()}
      document.querySelector(".keys").appendChild(cancelBtn);

      document.querySelector("#cancelBtn").appendChild(document.createTextNode('NO'))


  }


  




