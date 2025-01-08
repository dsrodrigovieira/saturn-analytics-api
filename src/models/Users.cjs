const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  fullname: { type: String, required: true },  
  password: { type: String, required: true },
  organization_cnes: { type: Number, required: true, default: 9876543 },  
  ocupation: { type: String, default: null },
  birthdate: { type: Date, default: null },
  profile: { type: String, default: "User" },
  status: { type: String, default: "Active" },    
  createdAt: { type: Date, default: Date.now },
  resetPasswordToken: { type: String, default: null },
  resetPasswordExpires: { type: Date, default: null},  
});

module.exports = mongoose.model("user", UserSchema);