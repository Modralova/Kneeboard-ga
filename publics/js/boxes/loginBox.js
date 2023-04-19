


export function loginBox(){


    let loginbox = document.createElement("div");
    loginbox.classList.add("loginbox")
    loginbox.id = "loginbox";
    document.querySelector("body").appendChild(loginbox);

   
    let logintable = document.createElement("div");
    logintable.classList.add("logintable");
    logintable.id = "logintable"
    document.querySelector('#loginbox').appendChild(logintable);

/*
    let regResTable = document.createElement("div");
    regResTable.classList.add("regResTable");
    regResTable.id = "regResTable"
    document.querySelector('#loginbox').appendChild(regResTable); */


      let form = document.createElement('form')
      form.id ='loginForm'
      form.method = "POST";
      form.action = window.location.href+ "login";  
      document.querySelector('#logintable').appendChild(form);


   
    let span1 = new Object()
    for(let i=1;i<7;i++){

    span1[`${i}`] = document.createElement("span")
    span1[`${i}`].classList.add('loginspan');
    span1[`${i}`].id = `span${i}`
    document.querySelector('#loginForm').appendChild(span1[`${i}`])
    }

    let span2 = new Object()
    for(let i=7;i<8;i++){

    span2[`${i}`] = document.createElement("span")
    span2[`${i}`].classList.add('regResSpan');
    span2[`${i}`].id = `span${i}`
    document.querySelector('#logintable').appendChild(span2[`${i}`])

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
    pswdDsc.classList.add("dsc5")
    
    document.querySelector('#span3').appendChild(pswdDsc)
    document.querySelector("#pswdDsc").appendChild(document.createTextNode('password:'))


    let pswdWdw = document.createElement('input');
    pswdWdw.classList.add("wdw6")
    pswdWdw.id = 'pswdwdw'
    pswdWdw.name = 'password'
    pswdWdw.setAttribute("type", "password");
    document.querySelector('#span4').appendChild( pswdWdw)


    let s1 = document.createElement('p');
    document.querySelector("#span5").appendChild(s1);


   
    let registerBtn = document.createElement("input");
    registerBtn.id = "loginBtn";

    
      registerBtn.setAttribute("type", "submit");
      registerBtn.value = 'Sign in'
      registerBtn.onclick = () => {}  
      document.querySelector("#span6").appendChild(registerBtn);


  /*  let s2 = document.createElement('p');
    document.querySelector("#span7").appendChild(s2); */

   //////////  



       /*let s3 = document.createElement('p');
       document.querySelector("#span8").appendChild(s3);*/


       let s4 = document.createElement('p');
       s4.id = "regResLinks"
       document.querySelector("#span7").appendChild(s4);


      let registerlink = document.createElement('a')
      registerlink.id = 'reglink'
      registerlink.setAttribute('href', window.location.href + "register"); 
      registerlink.appendChild(document.createTextNode('register'));
      document.querySelector('#regResLinks').appendChild(registerlink)
      
      
      let br = document.createElement('br')
      document.querySelector('#regResLinks').appendChild(br)

      
      

      
      let resetlink = document.createElement('a')
      resetlink.id = 'reslink'
      resetlink.setAttribute('href', window.location.href + "request");
      resetlink.appendChild(document.createTextNode('forgot password?'));
      document.querySelector('#regResLinks').appendChild(resetlink)
      
    
      



      
    



}