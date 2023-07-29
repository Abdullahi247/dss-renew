var mongoose = require('mongoose');
var mysql = require('mysql2')
const env = require('dotenv')
env.config()
console.log(process.env.HOST, process.env.USER, process.env.PASSWORD, process.env.DATABASE)
// const connectMysql = mysql.createConnection({
//     host: process.env.HOST,
//     // user: process.env.USER,
//     user:"root",
//     password: process.env.PASSWORD,
//     database: process.env.DATABASE,
// })


module.exports = async () => {
    //Set up default mongoose connection
    var mongoDB = process.env.MONGOBD_URI;
    mongoose.connect(mongoDB, { useNewUrlParser: true });
    //Get the default connection
    var db = mongoose.connection;
    //Bind connection to error event (to get notification of connection errors)
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    db.on('connection', console.log.bind("Success"))
    db.on('connected', console.log.bind(console, 'MongoDB connected Successful to DSS:'));

}

// Connect to the MySQL database
// module.exports = async () => connectMysql.connect(async (error) => {
//     if (error) {
//         console.error('Error connecting to MySQL database:', error);
//     } else {
//         console.log('Connected to MySQL database');
//     }
// });

