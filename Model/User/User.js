const mongoose = require("mongoose")
const userSchema = new mongoose.Schema(
{
  firstName: {
      type: String,
      required: [true, "firstName is require"]
      trim: true
  },
  lasttName: {
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

}
)