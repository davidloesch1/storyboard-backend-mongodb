const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')


require('dotenv').config()

const app = express()
const port = process.env.PORT || 5000
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors())
app.use(bodyParser.json())
const uri = require("./config/keys").mongoURI;
// const uri = process.env.ATLAS_URI
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true}
)
const connection = mongoose.connection
connection.once('open', () => {
    console.log("Mongodb connection established successfully")
})

const plotRouter = require('./routes/plots')
const userRouter = require('./routes/users')

app.use('/plots', plotRouter)
app.use('/users', userRouter)

app.listen(port, () => {
    console.log(`server is running on port: ${port}`)
})