const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()


app.use(cors())
app.options('*', cors)
app.use(express.json()) 

app.get("/api", (req, res) => {
  res.json({"users": ["UserOne", "UserTwo", "UserThree"]})
})


// db connect 
mongoose.connect(process.env.CONNECTION_STRING)
.then(()=> console.log('connected to db'))
.catch((err)=> console.log(err))

app.listen(8080, () => { console.log("listening to server")})