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
router.get('/getid', async (req, res) => {
  const { wallet } = req.query;
  try {
      // Find the wallet in the database
      const result = await User.findOne({ wallet });
      console.log(result)

      if (result) {
          // If wallet is found, return its _id
          res.json({ _id: result._id });
      } else {
          // If wallet is not found, return a 404 status
          res.status(404).json({ error: 'Wallet not found' });
      }
  } catch (error) {
      // Handle any errors
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/')

module.exports = router
