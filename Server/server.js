const express = require('express')
const app = express()
const cors = require('cors')
const router = express.Router()
const mongoose = require('mongoose')
require('dotenv').config()

// env strings
const mongo = process.env.CONNECTION_STRING

// middleware
app.use(cors())
app.options('*', cors)
app.use(express.json()) 

//routes
const usersRouter = require('./Router/users')

app.use("/api/users", usersRouter)



// db connect 
mongoose.connect(mongo)
.then(()=> console.log('connected to db'))
.catch((err)=> console.log(err))

app.listen(8080, () => { console.log("listening to server")})