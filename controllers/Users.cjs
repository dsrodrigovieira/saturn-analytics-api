const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const User = require("../models/Users.cjs");

require('dotenv').config();

// Configuração do transportador de email
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,    
  },
});

async function registerNewUser (req, res) {
    const { username, email, fullname, password } = req.body;  
    if (!username || !email|| !fullname || !password) {
      return res.status(400).json({ message: "Todos os campos são obrigatórios." });
    }  
    try {
      // Verifica se o usuário já existe
      const existingUser = await User.findOne({ $or: [{ username:username }, { email:email }] });  
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

async function deleteUser (req, res) {
    const { email, password } = req.body;
    if (!password || !email) {
        return res.status(400).json({ message: "Informe o Email e a Senha para exclusão." });
    }
    try {
        // Verifica se o usuário já existe
        const existingUser = await User.findOne({ email:email });
        if (!existingUser) {   
        return res.status(400).json({ message: "Usuário não encontrado." });
        } else {
        // Verifica a senha
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Senha incorreta." });
        } else {
            await User.deleteOne({ email:email })
            return res.status(200).json( { message: `Usuário ${existingUser.fullname} (${existingUser.username}) excluído com sucesso` });
        }
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erro no servidor." });
    }
}

async function signInUser (req, res) {
    const { email, password } = req.body;  
    if (!email || !password) {
      return res.status(400).json({ message: "Email e senha são obrigatórios." });
    }  
    try {
      // Verifica se o usuário existe
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Credenciais inválidas." });
      }  
      // Verifica a senha
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: "Credenciais inválidas." });
      }  
      // Gera o token JWT
      const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });  

      // Configuração do cookie
      res.cookie('authToken', token, {
        httpOnly: true, // Previne acesso via JavaScript no navegador
        //secure: process.env.NODE_ENV === 'production', // Apenas HTTPS em produção
        secure: false,
        sameSite: 'strict', // Previne CSRF
        maxAge: 3600000, // 1 hora
      });

      res.status(200).json({ message: 'Login realizado com sucesso!' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Erro no servidor." });
    }
};

async function validateCookie (req, res) {
  const token = req.cookies.authToken;

  if (!token) {
    return res.status(401).json({ message: "Token inválido ou expirado" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return res.status(200).json({ message: "Autenticado", user: decoded });
  } catch (err) {
    return res.status(401).json({ message: "Token inválido ou expirado" });
  }
}

async function requestResetUserPassword (req, res) {
    const { email } = req.body;  
    if (!email) {
      return res.status(400).json({ message: "Email é obrigatório." });
    }  
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado." });
      }  
      // Gera um token único e define o tempo de expiração
      const resetToken = crypto.randomBytes(32).toString("hex");
      user.resetPasswordToken = resetToken;
      user.resetPasswordExpires = Date.now() + 3600000; // 1 hora
      await user.save();
  
      // Monta o link de reset
      const resetURL = `http://${req.headers.host}/reset-password/${resetToken}`;
      console.log(resetURL);
  
      // Envia o email
      await transporter.sendMail({
        to: user.email,
        from: process.env.EMAIL_USER,
        subject: "Redefinição de Senha",
        html: `
          <h4>Você solicitou a redefinição de senha</h4>
          <p>Clique no link abaixo para redefinir sua senha:</p>
          <a href="${resetURL}">${resetURL}</a>
          <p>O link expira em 1 hora.</p>
        `,
      });
  
      res.json({ message: "Email de redefinição de senha enviado!" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Erro ao processar solicitação." });
    }
}

async function resetUserPassword (req, res) {
    const { token } = req.params;
    const { password } = req.body;
  
    if (!password) {
      return res.status(400).json({ message: "Senha é obrigatória." });
    }
  
    try {
      const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() }, // Verifica se o token ainda é válido
      });
  
      if (!user) {
        return res.status(400).json({ message: "Token inválido ou expirado." });
      }
  
      // Atualiza a senha e limpa o token de reset
      user.password = await bcrypt.hash(password, 10);
      user.resetPasswordToken = null;
      user.resetPasswordExpires = null;
      await user.save();
  
      res.json({ message: "Senha redefinida com sucesso!" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Erro ao redefinir senha." });
    }
}

async function getUser (req, res) {
    const { username, email } = req.body;
    if (!username && !email) {
      return res.status(400).json({ message: "Informe o Usuário ou Email." });
    }
    try {
      // Verifica se o usuário já existe
      const existingUser = await User.findOne({ $or: [{ username:username }, { email:email }] });
      if (!existingUser) {
        console.log(req.body)
        return res.status(400).json({ message: "Usuário não encontrado." });
      } else {
        return res.status(200).json(existingUser);
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Erro no servidor." });
    }
}

function logoff (req, res) {
  res.clearCookie('authToken', {
    httpOnly: true,
    // secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });
  res.json({ message: 'Logout realizado com sucesso!' });
};

module.exports = { registerNewUser, deleteUser, signInUser, requestResetUserPassword, resetUserPassword, getUser, logoff, validateCookie };