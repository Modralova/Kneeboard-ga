import { reqBox } from "./boxes/reqBox.js";
import { alertBox } from "./boxes/req_alert.js";

reqBox();


document.forms['reqForm'].addEventListener('submit', (event) => {

    event.preventDefault();

    let RESPONSE

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
        console.log(body.message); console.log(RESPONSE.status)
        alertBox(body.message, RESPONSE.status);
    }).catch((err) => { console.log(err); });



    event.preventDefault();

    setTimeout(function redirect(){ window.location.href = window.location.origin }, 5000);

    


    




})
