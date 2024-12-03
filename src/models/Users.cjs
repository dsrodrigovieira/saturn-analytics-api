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

export async function getUser(username, email) {
    if (!username && !email) {
      return res.status(400).json({ message: "Informe o e-mail ou usário." });
    }
  
    try {
      // Verifica se o usuário já existe
      const existingUser = await User.findOne({ $or: [{ username }, { email }] });
  
      if (!existingUser) {
        return res.status(400).json({ message: "Usuário não encontrado." });
      }
  
      // Criptografa a senha
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Cria o usuário
      const newUser = new User({ username, email, fullname, password: hashedPassword });
      await newUser.save();
  
      res.status(201).json({ message: "Usuário registrado com sucesso!" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Erro no servidor." });
    }  
}

export async function postUser(username, email, fullname, password) {
    if (!username || !email|| !fullname || !password) {
      return res.status(400).json({ message: "Todos os campos são obrigatórios." });
    }
  
    try {
      // Verifica se o usuário já existe
      const existingUser = await User.findOne({ $or: [{ username }, { email }] });
  
      if (existingUser) {
        return res.status(400).json({ message: "Usuário ou email já estão em uso." });
      }
  
      // Criptografa a senha
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Cria o usuário
      const newUser = new User({ username, email, fullname, password: hashedPassword });
      await newUser.save();
  
      res.status(201).json({ message: "Usuário registrado com sucesso!" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Erro no servidor." });
    }  
}

// module.exports = mongoose.model("user", UserSchema);