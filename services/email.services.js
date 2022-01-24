
require('dotenv').config()
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

//ES6
const sendEmail = (toEmail,emailHeader,contentMessage) => {
    const msg = {
        to: toEmail,
        from: 'info@afriglobal.com.ng', // Use the email address or domain you verified above
        subject: emailHeader,
        html: contentMessage,
      };
    sgMail.send(msg)
    .then(() => {
        return "suucesss"
    })
        .catch(err => {
        console.log("error: ", JSON.stringify(err.response.body))
            return "failed"
    })
    
}
//ES8
// (async () => {
//   try {
//     await sgMail.send(msg);
//   } catch (error) {
//     console.error(error);

//     if (error.response) {
//       console.error(error.response.body)
//     }
//   }
// })();

module.exports = {
    sendEmail
}