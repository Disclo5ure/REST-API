const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (email, verifToken) => {
  const mail = {
    to: email,
    from: "46845468m@gmail.com",
    subject: "Верифікація",
    html: `<a href='http://localhost:3000/api/users/verify/${verifToken}'>натисніть сюди</a>`,
  };
  await sgMail.send(mail);
  return true;
};

module.exports = sendEmail;
