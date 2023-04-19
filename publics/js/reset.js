import { resetBox } from "./boxes/resetBox.js";
import { alertBox } from "./boxes/reset_alert.js";


let RESET = new Object();



RESET.IDs = ['email', 'new', 'confirm', 'resetBtn'];


resetBox();

for (const ID of RESET.IDs[Symbol.iterator]()) {
    RESET[`${ID}`] = document.getElementById(`${ID}`);
    console.log(RESET[`${ID}`])
}

let swch = RESET.resetBtn;




document.forms['resetForm'].addEventListener('submit', (event) => {


    


    event.preventDefault();


    if (!swch.value) {

        let match = document.createElement('span')
        match.style.color = "red";
        let info = document.createTextNode(" doesen't match!:")
        let space = document.createTextNode("\u0020")

        match.appendChild(info)
        newpswdDsc.appendChild(space)
        newpswdDsc.appendChild(match)

        return

    } else {

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
        }).catch((err) => { console.log(err); });




        event.preventDefault();
    
        setTimeout(function redirect(){ window.location.href = window.location.origin }, 5000);
    }

});







RESET.new.addEventListener('input', () => {


    if (RESET.new.value != RESET.confirm.value || RESET.new.value == "" || RESET.confirm.value == "") {

        RESET.new.style.backgroundColor = 'rgba(255, 0, 0, 0.4)';
        RESET.confirm.style.backgroundColor = 'rgba(255, 0, 0, 0.4)';
        swch.value = false;

    }
    else {
        RESET.new.style.backgroundColor = "white";
        RESET.confirm.style.backgroundColor = "white";
        swch.value = true;

    }

})

RESET.confirm.addEventListener('input', () => {


    if (RESET.new.value != RESET.confirm.value || RESET.new.value == "" || RESET.confirm.value == "") {

        RESET.new.style.backgroundColor = 'rgba(255, 0, 0, 0.2)';
        RESET.confirm.style.backgroundColor = 'rgba(255, 0, 0, 0.2)';
        swch.value = false;


    }
    else {
        RESET.new.style.backgroundColor = "white";
        RESET.confirm.style.backgroundColor = "white";
        swch.value = true;

    }

})



