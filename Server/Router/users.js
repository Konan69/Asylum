const { User } = require("../Models/user")
const express = require('express')
const router = express.Router()


router.get("/", async(req,res)=>{
  res.send({hi : "hello"})
})

// Route handler for signing in by connecting wallet/ creating new user
router.post("/", async(req,res) =>{
  try {
    const { wallet } = req.body;

    // Check if the wallet address already exists
    const existingUser = await User.findOne({ wallet });
    if (existingUser) {
      // Wallet address already exists
      return res.status(200).json(existingUser);
    } else {
      // Wallet address doesn't exist, create a new document
      const newUser = new User({
        wallet: req.body.wallet,
        referrals: req.body.referrals,
        points: req.body.points
      });
      await newUser.save();
      return res.status(200).json(newUser);
    }
  } catch (error) {
    console.error('Error connecting wallet:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

//api endpoint for updating refewrral invite points on new registrations
router.post("/r/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { wallet } = req.body;
    const inviter = await User.findOne({ id });
    const invited = await User.findOne({ wallet });

    //IF unvited user doesnt exist create their account in db and 
    //log them in and add points to inviter
    if (!invited) {
    const newUser = new User({wallet: req.body.wallet})
    await newUser.save();
    User.findByIdAndUpdate(id, { $inc: { refferals: 1 } }, { new: true })
    return res.status(200).json(invited)
    
    }else {
    // Check if the invited doe exists in db , log them in ;
    return res.status(200).json(invited)
    };
    // add error habdling for wrong invite code
     
  } catch (error) {
    console.error('Error adding referral point:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
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
