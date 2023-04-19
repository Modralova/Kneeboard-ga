





export function alertBox (message,status)  {

  
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
            case 500: Alert.classList.add("alert"); break;
            case 404: Alert.classList.add("alert"); break;
            case 401: Alert.classList.add("alert"); break;
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
  
      document.querySelector("#aBox_msg").appendChild(document.createTextNode(JSON.stringify(message)));
       
      
      }