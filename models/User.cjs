const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  fullname: { type: String, required: true },  
  password: { type: String, required: true },
  organization_id: { type: mongoose.Types.ObjectId, default: new mongoose.Types.ObjectId('6745d7873f4e39e161319575') },  
  ocupation: { type: String, default: null },
  birthdate: { type: Date, default: null },
  profile: { type: String, default: "User" },
  status: { type: String, default: "Active" },    
  createdAt: { type: Date, default: Date.now },
  resetPasswordToken: { type: String, default: null },
  resetPasswordExpires: { type: Date, default: null},  
});

module.exports = mongoose.model("user", UserSchema);