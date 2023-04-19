

export function resetBox(){


    let registerbox = document.createElement("div");
    registerbox.classList.add("registerbox")
    registerbox.id = "registerbox";
    document.querySelector("body").appendChild(registerbox);

   
    let regtable = document.createElement("div");
    regtable.classList.add("regtable");
    regtable.id = "regtable"

    document.querySelector('#registerbox').appendChild(regtable);


      let form = document.createElement('form')
      form.id ='resetForm'
      form.method = "POST";
      form.action = window.location.href + "/reset"; 
      document.querySelector('#regtable').appendChild(form);


   
    let span = new Object()
    for(let i=1;i<7;i++){

    span[`${i}`] = document.createElement("span")
    span[`${i}`].classList.add('loginspan');
    span[`${i}`].id = `span${i}`
    document.querySelector('#resetForm').appendChild(span[`${i}`])

    }



  


    let newpswdDsc = document.createElement('p');
    newpswdDsc.classList.add("dsc5")
    newpswdDsc.id = 'npswdDsc'
    document.querySelector('#span1').appendChild(newpswdDsc)
    document.querySelector("#npswdDsc").appendChild(document.createTextNode('new password: '))

    let newPswdWdw = document.createElement('input');
    newPswdWdw.classList.add("wdw6")
    newPswdWdw.id = 'new'
    newPswdWdw.name = 'new'
    newPswdWdw.setAttribute("type", "password");
    document.querySelector('#span2').appendChild(newPswdWdw)

    let pswdDsc = document.createElement('p');
    pswdDsc.classList.add("dsc5")
    pswdDsc.id = 'pswdDsc'
    
    document.querySelector('#span3').appendChild(pswdDsc)
    document.querySelector("#pswdDsc").appendChild(document.createTextNode('confirm password:'))

    let pswdWdw = document.createElement('input');
    pswdWdw.classList.add("wdw6")
    pswdWdw.id = 'confirm';
    pswdWdw.name = 'confirm';
    pswdWdw.setAttribute("type", "password");
    document.querySelector('#span4').appendChild(pswdWdw)


    

    let sp1 = document.createElement('p')
    document.querySelector('#span5').appendChild(sp1)



    let resetBtn = document.createElement("button");
    resetBtn.id = "resetBtn";
    resetBtn.value = false;
    resetBtn.setAttribute("type", "submit");
    document.querySelector("#span6").appendChild(resetBtn);
    document.querySelector("#resetBtn").appendChild(document.createTextNode('reset'))


}






