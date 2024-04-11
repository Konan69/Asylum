const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  wallet: {
    type: String,
    required: true
  },
  referrals: {
    type: Number,
    required: true
  },
  points: {
    type: Number,
    required:true
  }
})
