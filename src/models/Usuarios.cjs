const mongoose = require("mongoose");

// Define o esquema (schema) para a coleção "usuarios" no MongoDB
const UserSchema = new mongoose.Schema({
  usuario: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  nome: { type: String, required: true },  
  senha: { type: String, required: true },
  cd_cnes_empresa: { type: Number, required: true, default: 9876543 },
  perfil: { type: String, default: "User" },
  status: { type: String, default: "Active" }
});

// Esse modelo será utilizado para criar, ler, atualizar e excluir documentos na coleção "usuarios"
module.exports = mongoose.model("usuarios", UserSchema);
