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

app.get('/', (req,res) => {
  res.json("hello")
})

// app.get("/*", function (req, res) {
//   res.sendFile(path.join(__dirname, "dist/index.html"), function (err) {
//     if (err) {
//       res.status(500).send(err);
//     }
//   });
// });




// db connect 
mongoose.connect("mongodb+srv://kixeyems0:wAjlc6D4pesyPEAV@cluster0.kw5stww.mongodb.net/cluster0?retryWrites=true&w=majority")
.then(()=> console.log('connected to db'))
.catch((err)=> console.log(err))

app.listen(8080, () => { console.log("listening to server")})