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
mongoose.connect('mongodb+srv://kixeyems0:wAjlc6D4pesyPEAV@cluster0.kw5stww.mongodb.net/cluster0?retryWrites=true&w=majority')
.then(()=> console.log('connected to db'))
.catch((err)=> console.log(err))

app.listen(8080, () => { console.log("listening to server")})