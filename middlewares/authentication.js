const { Account } = require("../models/account")
const Bcrypt = require('bcrypt')
const jsonwebtoken = require('jsonwebtoken')
const fileSystem = require('fs')
const path = require('path')
const htmlPdfNode = require('html-pdf-node')
// const nodemailer = require('nodemailer')
// const dotEnv = require('dotenv')

// dotEnv.config()
// const smtpConfig = {
//   host: 'smtp.gmail.com',
//   port: 587,
//   secure: false, // Set to true if your SMTP server requires a secure connection (e.g., Gmail)
//   auth: {
//     user: process.env.NODEMAILERSERVER_EMAIL,
//     pass: process.env.NODEMAILERSERVER_PASS
//   }
// };


// const transporter = nodemailer.createTransport(smtpConfig);


async function LoginAuth(request, response) {
  try {
    console.log("request.body")
    console.log(request.body)
    console.log("request.body")
    const { email, userPass } = request.body
    if (!email || !userPass) throw new Error("Failed input field")

    const account = await Account.findOne({ email: email }, { verified: 0, createdAt: 0, updatedAt: 0, __v: 0, _id: 0 }).exec()
    console.log(account)

    if (!account) throw new Error("Incorrect email or password")
    const { password } = account
    const authCheck = await Bcrypt.compareSync(userPass, password)
    if (!authCheck) throw new Error("Incorrect email or password")
    const accessToken = await jsonwebtoken.sign({ email: email }, process.env.JWTTOKEN, { expiresIn: 10 })
    console.log(accessToken, "22")
    response.status(200).send({ statusMessage: accessToken })
  } catch ({ message }) {
    console.log(message)
    response.status(400).send({ statusMessage: message })
  }
}

async function AccountChecker(request, response, next) {
  try {
    const { email } = request.body
    const accountCheck = await Account.findOne({ email: email }).exec()
    if (accountCheck) throw new Error("Account already registered")
    next()
  } catch ({ message }) {
    response.status(400).send({ statusMessage: message })
  }
}

async function SignUp(request, response) {
  try {
    console.log(request.body)
    const { email, firstname, lastname, contact, password } = request.body
    if (!email || !password || !firstname || !lastname || !contact || typeof (email) !== 'string') throw new Error("Failed")
    const hashedPass = await Bcrypt.hashSync(password, 10)
    const newUser = new Account({
      firstname: firstname,
      lastname: lastname,
      email: email,
      contact: contact,
      password: hashedPass
    })

    await newUser.save()

    response.status(200).send({ statusMessage: "Success" })
  } catch ({ message }) {
    response.status(400).send({ statusMessage: message })
  }

}

async function UpdateProfile(request, response) {
  try {
    console.log(request)
    console.log(request['authorization'])
    const raw = request.rawHeaders[1]
    console.log(header)
    console.log(raw.slice(7, raw.length))
    const auth = raw.slice(7, raw.length)
    const jwtVerifier = jsonwebtoken.verify(auth, process.env.JWTTOKEN,)
    console.log(jwtVerifier)
    console.log(jwtVerifier)
    console.log(jwtVerifier)
    if (!jwtVerifier) throw new Error("Failed")
    const { email } = jwtVerifier
    // const { email, firstname } = request.body
    // const profileUpdate = await Account.findOneAndUpdate({ email: email }, { firstname: firstname }).exec()
    // if (!profileUpdate) throw new Error("Unable to update profile")
    response.status(200).send({ statusMessage: email })
  } catch ({ message }) {
    console.log(message)
    response.status(400).send({ statusMessage: "unable to get account" })
  }
}

async function Authorization(request, response, next) {
  try {
    console.log(raw.slice(7, raw.length))
    const auth = raw.slice(7, raw.length)
    const jwtVerifier = jsonwebtoken.verify(auth, process.env.JWTTOKEN,)
    next()
  } catch (error) {

  }
}

async function DeleteProfile(request, response) {
  try {
    const email = request.body.email
    const deleteProfile = await Account.findOneAndDelete({ email: email }).exec()
    if (!deleteProfile) throw new Error("Unable to delete account")
    response.status(200).send({ statusMessage: "Thank you for your time, Bye" })
  } catch ({ message }) {
    response.status(400).send({ statusMessage: message })
  }
}

async function ForwardMail(request, response) {
  try {
    const mailOptions = {
      from: 'tsmart247@gmail.com',
      to: 'tsmart247@gmail.com',
      subject: 'Test Email from Nodemailer',
      text: 'Hello, this is a test email sent using Nodemailer!'
    };

    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });
    response.status(200).send({ statusMessage: "Success" })

  } catch (error) {
    console.log(error)
    response.status(400).send({ statusMessage: "Failed" })
  }
}

async function DecodedUser(request, response, next) {
  try {
    const { email } = request.body
    console.log(email)
    response.locals = { email }
    next()

  } catch (error) {
    response.status(400).send({ statusMEssage: "Failed" })
  }
}

async function FileReader(request, response, next) {
  try {
    const { email } = request.body
    console.log(email)
    const fileReader = await fileSystem.readFileSync(path.join(__dirname + "/public/index.html"))

    fileSystem.readFile(path.join(__dirname + '/public/index.html'), (err, file) => {
      if (err) {
        throw new Error(err)
      }
      else {
        response.locals = { emailFile: fileReader, email: email }
      }
    })

    next()
  } catch (error) {
    console.log(error)
    response.status(400).send({ statuMessage: "Failed" })

  }

}

async function ClientCert(request, response, next) {
  try {
    const fileReader = await fileSystem.readFileSync(path.join(__dirname + "/public/index.html"))
    response.locals = { emailFile: fileReader, }
    next()
  } catch (error) {
    console.log(error)
    response.status(400).send({ statuMessage: "Failed" })

  }
}

async function PdfToClinet(request, response) {
  const { emailFile } = response.locals
  const sendPdf = await htmlPdfNode.generatePdf({ paper: 'A4', })
}

module.exports = {PdfToClinet, FileReader, LoginAuth, Authorization, SignUp, ForwardMail, AccountChecker, UpdateProfile, DeleteProfile, DecodedUser }