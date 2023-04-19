var nodemailer = require('nodemailer');
require('dotenv').config({ path: '.env' });
const { google } = require('googleapis');






const Oauth2_client = new google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env.REDIRECT_URI);


Oauth2_client.setCredentials({refresh_token: process.env.REFRESH_TOKEN });






async function sendEmail(req ,  name, email, token, issue) {


        console.log("issue=",issue)
        console.log("req.get('origin')=", req.get('origin'))
        console.log("USER_EMAIL=",process.env.USER_EMAIL )
        console.log("CLIENT_ID=",process.env.CLIENT_ID )
        console.log("CLIENT_SECRET=",process.env.CLIENT_SECRET )
        console.log("REFRESH_TOKEN=",process.env.REFRESH_TOKEN )
        console.log("ACCESS_TOKEN=",process.env.ACCESS_TOKEN )
        console.log("token=",token)
  try {

    const accesToken = await Oauth2_client.getAccessToken()

    const transport = nodemailer.createTransport({

      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.USER_EMAIL,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accesToken: process.env.ACCESS_TOKEN
        
      }
    })


           const url1 = req.get('origin') + `/verify/${token}`
           const url2 = req.get('origin') + `/reset/${token}`
      


    switch (issue) {

      case "verify":

        const mailOptions1 = {
          from: `${process.env.SITE_NAME} <${process.env.USER_EMAIL}>`,    
          to: email,
          subject: `${process.env.SITE_NAME} email confirmation request`,

          html: `Hi ${name}!` + "<br>" + "<br>" +

            "This is message from ga.Kneeboard email confirmation system." + "<br>" +

            "Please, click the " + `<a href = '${url1}'>link</a>` + " to confirm your email address." + "<br>" + "<br>" +

            `Greetings from ${process.env.SITE_NAME}`

        }


        const result1 = await transport.sendMail(mailOptions1)

        return result1;


      case "reset":

        const mailOptions2 = {

          from: `${process.env.SITE_NAME}` + `<${process.env.USER_EMAIL}>`,
          to: email,
          subject: `${process.env.SITE_NAME} reset password request`,

          html: `Hi ${name}!` + "<br>" + "<br>" +

            `This is message from ${process.env.SITE_NAME} password reset system.` + "<br>" +

            "Please, click the " + `<a href = '${url2}'>link</a>` + " to reset your password." + "<br>" + "<br>" +

            `Greetings from ${process.env.SITE_NAME}`

                }

            const result2 = await transport.sendMail(mailOptions2)

            return result2;
              }
      

    } catch (err) {

      return err
    }

  
}

module.exports = sendEmail;




