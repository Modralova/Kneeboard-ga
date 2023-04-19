



export function registerBox(){


    let registerbox = document.createElement("div");
    registerbox.classList.add("registerbox")
    registerbox.id = "registerbox";
    document.querySelector("body").appendChild(registerbox);

   
    let regtable = document.createElement("div");
    regtable.classList.add("regtable");
    regtable.id = "regtable"

    document.querySelector('#registerbox').appendChild(regtable);

      let form = document.createElement('form')
      form.id ='registerForm'
      form.method = "POST";
      form.action = window.location.href + "/signup";  
      document.querySelector('#regtable').appendChild(form);


   
    let span = new Object()
    for(let i=1;i<11;i++){

    span[`${i}`] = document.createElement("span")
    span[`${i}`].classList.add('loginspan');
    span[`${i}`].id = `span${i}`
    document.querySelector('#registerForm').appendChild(span[`${i}`])
    }

    



    let userDsc = document.createElement('p');
    userDsc.classList.add("dsc5")
    userDsc.id = 'userDsc'
    document.querySelector('#span1').appendChild(userDsc)
    document.querySelector("#userDsc").appendChild(document.createTextNode('email:'))

    let userWdw = document.createElement('input');
    userWdw.classList.add("wdw6")
    userWdw.id = 'userwdw'
    userWdw.name = 'email'
    document.querySelector('#span2').appendChild(userWdw)

    let pswdDsc = document.createElement('p');
    pswdDsc.classList.add("dsc5")
    pswdDsc.id = 'pswdDsc'
    
    document.querySelector('#span3').appendChild(pswdDsc)
    document.querySelector("#pswdDsc").appendChild(document.createTextNode('password:'))

    let pswdWdw = document.createElement('input');
    pswdWdw.classList.add("wdw6")
    pswdWdw.id = 'pswdwdw';
    pswdWdw.name = 'password';
    pswdWdw.setAttribute("type", "password");
    document.querySelector('#span4').appendChild(pswdWdw)


    let nameDsc = document.createElement('p');
    nameDsc.classList.add("dsc5")
    nameDsc.id = 'nameDsc'
    document.querySelector('#span5').appendChild(nameDsc)
    document.querySelector("#nameDsc").appendChild(document.createTextNode('name:'))

    let nameWdw = document.createElement('input');
    nameWdw.classList.add("wdw6")
    nameWdw.id = 'namewdw';
    nameWdw.name = 'name';
    document.querySelector('#span6').appendChild(nameWdw)


    let surnameDsc = document.createElement('p');
    surnameDsc.classList.add("dsc5")
    surnameDsc.id = 'surnameDsc'
    document.querySelector('#span7').appendChild(surnameDsc)
    document.querySelector("#surnameDsc").appendChild(document.createTextNode('surname:'))

    let surnameWdw = document.createElement('input');
    surnameWdw.classList.add("wdw6")
    surnameWdw.id = 'surnamewdw'
    surnameWdw.name = 'surname';
    document.querySelector('#span8').appendChild(surnameWdw)

    let sp1 = document.createElement('p')
    document.querySelector('#span9').appendChild(sp1)




    let registerBtn = document.createElement("button");
    registerBtn.id = "registerBtn";
    
    registerBtn.setAttribute("type", "submit");
    document.querySelector("#span10").appendChild(registerBtn);
    document.querySelector("#registerBtn").appendChild(document.createTextNode('Sign up'))


}