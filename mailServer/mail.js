const nodemailer = require('nodemailer')

const config = ({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: process.env.NODEMAILERSERVER_EMAIL,
        pass: process.env.NODEMAILERSERVER_PASS
    }
})

const EMAILSENDER = nodemailer.createTransport(config)

async function NewUserMailSystem(request, response) {
    const { email, emailFile } = response.locals
    console.log(email)
    try {
        const sendOut = await EMAILSENDER.sendMail({
            to: email,
            from: process.env.NODEMAILERSERVER_EMAIL,
            body: '',
            subject: "Timi from DSS",
            html: emailFile

        })

        response.status(200).send({ statuMessage: "Success" })

    } catch (error) {
        console.log(error)
        response.status(400).send({ statusMEssage: "Sory, we can't process new otp for you." })
    }
}

async function OtpNewTransaction(request, response) {
    const { email } = response.locals
    console.log(email)
    try {
        const sendOut = await EMAILSENDER.sendMail({
            to: email,
            from: process.env.NODEMAILEREMAIL,
            body: '',
            subject: "Mail Intended for Mr AkintoGeneral",
            html: `<h3>This is a test mail</h3>`

        })

        response.status(200).send({ statuMessage: "Success" })

    } catch (error) {
        console.log(error)
        response.status(400).send({ statusMEssage: "Sory, we can't process new otp for you." })
    }
}

module.exports = { OtpNewTransaction, NewUserMailSystem }