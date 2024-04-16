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


//api endpoint for updating refewrral invit c  ve points on new registrations
// router.post("/:id", async (req, res) => {
//   const id = req.query; 
//   console.log(id)
//   try {
//     //signup with referral
//     const { wallet } = req.body;
//     console.log(wallet)
//     const inviter = await User.findOne({_id : id});
//     console.log(inviter)
//     const invited = await User.findOne({ wallet });

//     //IF unvited user doesnt exist create their account in db and 
//     //log them in and add points to inviter
//     if (!invited) {
//     const newUser = new User({wallet: req.body.wallet})
//     await newUser.save();
    
//     const updatedInviter = await User.findOneAndUpdate({_id : id}, { $inc: { referrals: 1 } }, { new: true })
//     console.log(updatedInviter)

//     return res.status(200).json(newUser)
    
//     }else {
//     // Check if the invited doe exists in db , log them in ;
//     return res.status(200).json(invited)
//     };
//     // add error habdling for wrong invite code
     
//   } catch (error) {
//     console.error('Error adding referral point:', error);
//     return res.status(500).json({ error: 'Internal server error' });
//   }
//   // }
  
// })

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


router.post('/updatetask')
router.get('/')

module.exports = router
