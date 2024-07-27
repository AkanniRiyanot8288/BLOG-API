const mongoose = require("mongoose")
const userSchema = new mongoose.Schema(
{
  firstName: {
      type: String,
      required: [true, "firstName is require"]
  },
  lastName: {
      type: String,
      required: [true, "lastName is require"]
  },
  profilePhoto: {
      type: String,
      
  },
  email: {
    type: String,
    required: [true, "email is require"]
},
password: {
    type: String,
    required: [true, "password is require"]
},
postCount: {
    type: Number,
    default: 0,
},
isBlocked: {
    type: Boolean,
    default: false,
},
isAdmin: {
    type: Boolean,
    default: false,
},
role: {
    type: String,
    enum: ["Admin", "Guest", "Editor"],
},
viewers: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
},
followers: [
    {type: mongoose.Schema.Types.ObjectId,
    ref: "User",
},
],
following: [
    {type: mongoose.Schema.Types.ObjectId,
    ref: "User",
},
],
active: {
    type: Boolean,
    default: true,
},
post: [
    {type: mongoose.Schema.Types.ObjectId,
    ref: "post",
},
],
blocked: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
],
plan: [
    {
        type: String,
        enum: ["Free", "Premium", "Pro"],
        default: "Free",
    },
],
userAward: {
    type: String,
    enum: ["Bronze", "Silver", "Gold"],
    default: "Bronze",
},
},
{
    timestamps: true,
}
);
//compile the user model
const User = mongoose.model("User", userSchema);
module.exports = User;