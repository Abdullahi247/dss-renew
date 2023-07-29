const express = require('express')
const digitalSkillSchoolServer = express()
const envs = require('dotenv')
const cors = require('cors')
const bodyParser = require('body-parser')

const database = require('./database/database')
database()

envs.config()

const PORT = process.env.PORT

// digitalSkillSchoolServer.use(bodyParser.json())
digitalSkillSchoolServer.use(bodyParser.urlencoded({ extended: false }))
digitalSkillSchoolServer.use(cors())

// apis
const Authentication = require('./routes/authentication')
digitalSkillSchoolServer.use('/auth', Authentication)

digitalSkillSchoolServer.use('/health', (req, res) => {
    console.log("This is the health Checker")
    res.status(200).send("System Health Check Successfull")
})

const Authentications = require('./routes/authentication')
digitalSkillSchoolServer.use('/authoriztion', Authentications)
// apis


digitalSkillSchoolServer.listen(PORT, () => {
    console.log(`Server is up and running ${PORT}`)
})
