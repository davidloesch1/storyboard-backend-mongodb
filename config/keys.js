const dotenv = require('dotenv')
dotenv.config()
let url = process.env.MONGO_URI

module.exports = {
    mongoURI: url
}