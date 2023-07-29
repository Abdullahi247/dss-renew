const mongoose = require('mongoose')

const Schema = mongoose.Schema

const AccountSchema = new Schema({
    firstname: { type: String, length: 20 },
    lastname: { type: String, length: 30 },
    contact: { type: Number, length: 11 },
    email: { type: String, length: 50, },
    password: { type: String, required: true },
    verified: { type: Boolean, default: false },
}, { timestamps: true })

const StaffSchema = new Schema({

})

const Account = mongoose.model("Account", AccountSchema)
const Staff = mongoose.model("Staff", StaffSchema)

module.exports = { Account, Staff }