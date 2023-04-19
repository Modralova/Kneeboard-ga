import { loginBox } from "./boxes/loginBox.js";
import { alertBox } from "./boxes/gaK_boxes.js";



let USER

console.log(USER)

if(!USER || USER == undefined)
{

 USER = new Object();

}



USER.logged = false;

let swch = true;




let signInOut = document.getElementById('signInOut');




signInOut.addEventListener('click', () => {


   if (!swch) { return }


   swch = false;


   switch (signInOut.textContent) {

      case "login":



         if (swch) { return }

         

         else {

            loginBox();

            swch = false;

         };

         document.forms['loginForm'].addEventListener('submit', (event) => {
            event.preventDefault();


            let RESPONSE;

            fetch(event.target.action, {
               method: 'POST',
               body: new URLSearchParams(new FormData(event.target))
            }).then((res) => {
               RESPONSE = res
               if (res.ok) {

                  return RESPONSE.json()

               } else {

                  return RESPONSE.json()

               }
            }).then((body) => {
               alertBox(body.message, RESPONSE.status);
               loggingIn(body);
            }).catch((err) => { console.log(err); });




         });

         break;

      case "logout":

         let logoutURL = window.location.href + "logout";

         console.log("logout", logoutURL)

         let RESPONSE

         fetch(logoutURL, {
            method: "GET"

         })

            .then(res => { alertBox("logged out", res.status); console.log(res); }).catch(err => console.log(err));


         swch = true;

         signInOut.textContent = "login";

   }

})

function loggingIn(body) {

   let user = body.user

   if (USER || USER != undefined) {
      console.log("loggingIn USER: ", user)

      USER.name = user.name;
      USER.surname = user.surname;
      USER.email = user.email
      USER.veryfied = user.veryfied;
      USER.logged = true;

      console.log("USER: ", USER);

      signInOut.textContent = "logout";
      swch = true;

      document.getElementById("loginbox").remove()

      return USER;

   }
}









