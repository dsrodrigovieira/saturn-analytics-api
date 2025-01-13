const mongoose = require("mongoose");

// Define o esquema (schema) para a coleção "user" no MongoDB
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

// Exporta o modelo "user" baseado no esquema definido acima
// Esse modelo será utilizado para criar, ler, atualizar e excluir documentos na coleção "user"
module.exports = mongoose.model("user", UserSchema);
