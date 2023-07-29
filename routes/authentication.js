const express = require('express')
const { LoginAuth, AccountChecker, SignUp, UpdateProfile, DeleteProfile, ForwardMail, DecodedUser, Authorization, FileReader } = require('../middlewares/authentication')
const { OtpNewTransaction, NewUserMailSystem } = require('../mailServer/mail')

const route = express.Router()

route.post('/login', LoginAuth)

route.post('/signup', SignUp)

route.post('/update/profile', Authorization, UpdateProfile)

route.post('/delete/account', Authorization, DeleteProfile)

route.get('/forward/mail', Authorization, ForwardMail)

route.post('/otp/account/transaction', Authorization, DecodedUser, OtpNewTransaction)

// route.get('/product', Product)

route.post('/get/file', FileReader, NewUserMailSystem)

route.post('/generate/file_for_me', )



module.exports = route