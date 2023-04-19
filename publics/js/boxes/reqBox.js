



export function reqBox() {


  let reqbox = document.createElement("div");
  reqbox.classList.add("reqbox")
  reqbox.id = "reqbox";
  document.querySelector("body").appendChild(reqbox);


  let reqtable = document.createElement("div");
  reqtable.classList.add("reqtable");
  reqtable.id = "reqtable"

  document.querySelector('#reqbox').appendChild(reqtable);

  let span1 = new Object()
  for (let i = 0; i < 2; i++) {

    span1[`${i}`] = document.createElement("span")
    span1[`${i}`].classList.add('msgspan');
    span1[`${i}`].id = `span${i}`
    document.querySelector('#reqtable').appendChild(span1[`${i}`])
  }

  let msg = document.createElement('p');
  msg.classList.add("dsc5")
  msg.id = 'msgDsc'
  document.querySelector('#span0').appendChild(msg)
  document.querySelector("#msgDsc").appendChild(document.createTextNode("Provide your email address for receiving link to reset password"))


  let sp0 = document.createElement('p')
  document.querySelector('#span1').appendChild(sp0)


  let form = document.createElement('form')
  form.id = 'reqForm'
  form.method = "POST";
  form.action = window.location.href + "/passwordreset";
  document.querySelector('#reqtable').appendChild(form);



  let span2 = new Object()
  for (let i = 2; i < 6; i++) {

    span2[`${i}`] = document.createElement("span")
    span2[`${i}`].classList.add('reqspan');
    span2[`${i}`].id = `span${i}`
    document.querySelector('#reqForm').appendChild(span2[`${i}`])

  }


  let sp1 = document.createElement('p');
  sp1.classList.add("dsc5")
  sp1.id = 'emailDsc'
  document.querySelector('#span2').appendChild(sp1)
  document.querySelector("#emailDsc").appendChild(document.createTextNode('email:'))



  let emailWdw = document.createElement('input');
  emailWdw.classList.add("wdw6")
  emailWdw.id = 'email'
  emailWdw.name = 'email'
  document.querySelector('#span3').appendChild(emailWdw)

  let sp2 = document.createElement('p')
  document.querySelector('#span4').appendChild(sp2)

  let sendBtn = document.createElement("button");
  sendBtn.id = "sendBtn";
  sendBtn.value = false;
  sendBtn.setAttribute("type", "submit");
  document.querySelector("#span5").appendChild(sendBtn);
  document.querySelector("#sendBtn").appendChild(document.createTextNode('send'))






}