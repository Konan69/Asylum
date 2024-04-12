const { User } = require("../Models/user")
const express = require('express')
const router = express.Router()


router.get("/", async(req,res)=>{
  res.send({hi : "hello"})
})

router.post("/", async(req,res) =>{
  let user = new User({
  wallet: req.body.wallet,
  referrals: req.body.referrals,
  points: req.body.points
  })
  user = await user.save()

  if(!user) return res.status(400).send('user cannot be created ')

  res.send(user)
})

module.exports = router
