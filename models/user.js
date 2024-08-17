let mongoose = require("mongoose")

// user Schema
let userSchema = mongoose.Schema({
  userName:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  },
  role:{
    type:String,
    enum:["librarian","member","guest"],
    required:true
  },
  age:{
    type:Number,
    required:true
  },
})

// user model
const UserModel = mongoose.model("user",userSchema)

// exporting module
module.exports = UserModel