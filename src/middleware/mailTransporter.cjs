const nodemailer = require("nodemailer");

require('dotenv').config();

// Configuração do transportador de email
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,    
  },
});

module.exports = { default:transporter };