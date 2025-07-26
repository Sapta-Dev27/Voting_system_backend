import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true
  },
  userAdhar : {
   type : String ,
   unique : true ,
   required : true
  },
  userPassword : {
    type : String ,
    required: true
  },
  userRole : {
    type: String,
    enum : ["admin" , "user"],
    required: true,
    default : "user"
  },
  votingStatus : {
    type : String ,
    required: true,
    default: "false"
  }

})

const User = mongoose.model("User", userSchema);
export default User;