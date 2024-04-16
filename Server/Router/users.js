const { User } = require("../Models/user")
const express = require('express')
const router = express.Router()


router.get("/", async(req,res)=>{
  res.send({hi : "hello"})
})

// Route handler for signing in by connecting wallet/ creating new user
router.post("/", async (req, res) => {
  try {
    const { r } = req.query; // Get the id from the query parameters
    const { wallet } = req.body;

    if (r) {
      try {
        // Signup with referral
        console.log(wallet);
        const inviter = await User.findOne({ _id: r });
        console.log(inviter);
        const invited = await User.findOne({ wallet });

        // If invited user doesn't exist, create their account in db, log them in, and add points to inviter
        if (!invited) {
          const newUser = new User({ wallet });
          await newUser.save();

          const updatedInviter = await User.findOneAndUpdate(
            { _id: r },
            { $inc: { referrals: 1 } },
            { new: true }
          );
          console.log(updatedInviter);

          return res.status(200).json(newUser);
        } else {
          // If the invited user exists in db, return its details
          return res.status(200).json(invited);
        }
      } catch (error) {
        console.error('Error adding referral point:', error);
        return res.status(500).json({ error: 'Internal server error' });
      }
    } else {
      // Regular signup process
      try {
        // Check if the wallet address already exists
        const existingUser = await User.findOne({ wallet });
        if (existingUser) {
          // Wallet address already exists
          return res.status(200).json(existingUser);
        } else {
          // Wallet address doesn't exist, create a new document
          const newUser = new User({
            wallet,
          });
          await newUser.save();
          return res.status(200).json(newUser);
        }
      } catch (error) {
        console.error('Error connecting wallet:', error);
        return res.status(500).json({ error: 'Internal server error' });
      }
    }
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});


router.post('/addpoints', async (req, res) => {
 try { 
  const { wallet } = req.body
    const user = await User.findOne({ wallet });
    console.log(user)
    const updateduser = await User.findOneAndUpdate(
      { wallet },
      { $inc: { points: 1 } },
      { new: true }
    )
    console.log(updateduser)
    res.send(updateduser)
  } catch(error) {
    console.log(error)
    return res.status(500).json({ error: 'Internal server error' });
  }
})


router.post('/updatetask', async (req, res) => {
  const task = req.body.taskName
  const wallet = req.body.wallet

  const updateObj = {};
  updateObj[task] = true;
  console.log(updateObj)

  const updatedTask = await User.findOneAndUpdate({ wallet: wallet }, updateObj,{ new: true }
  );
  console.log(updatedTask)
  return res.status(200).json(updatedTask)
  
})

router.get('/')

module.exports = router
