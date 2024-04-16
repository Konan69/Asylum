const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  wallet: {
    type: String,
    required: true,
    unique: true,
    length: 42
  },
  referrals: {
    type: Number,
    required: true,
    default:0
  },
  points: {
    type: Number,
    required:true,
    default: 9
  },
  TwitterFollowed : {
    type: Boolean,
    required: true,
    default: false,
  },
  PostLiked : {
    type: Boolean,
    required: true,
    default: false,
  },
  TweetPosted: {
    type: Boolean,
    required: true,
    default: false,
  }
})

userSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

userSchema.set('toJSON', {
  virtuals: true,
});

exports.User = mongoose.model('User', userSchema)
exports.userSchema = userSchema