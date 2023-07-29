const nodemailer = require('nodemailer')
const dotEnv = require('dotenv')

dotEnv.config()
const smtpConfig = {
    host: 'smtp.example.com',
    port: 587,
    secure: false, // Set to true if your SMTP server requires a secure connection (e.g., Gmail)
    auth: {
        user: process.env.NODEMAILERSERVER_EMAIL,
        pass: process.env.NODEMAILERSERVER_PASS
    }
};


const transporter = nodemailer.createTransport(smtpConfig);

module.exports = transporter

