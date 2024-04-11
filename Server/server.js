const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())
app.options('*', cors)
app.use(express.json()) 

app.get("/api", (req, res) => {
  res.json({"users": ["UserOne", "UserTwo", "UserThree"]})
})

app.listen(8080, () => { console.log("listening to server")})