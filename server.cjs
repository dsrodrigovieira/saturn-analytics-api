const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const User = require("./models/User.cjs");
const moment = require("moment-timezone");

dotenv.config();

const app = express();

// Middleware de segurança e parse de JSON
app.use(helmet());
app.use(cors());
app.use(express.json());

// Conectar ao MongoDB
mongoose
  //.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Conectado ao MongoDB"))
  .catch((err) => console.error("Erro ao conectar ao MongoDB:", err));

// Configuração JWT
const SECRET_KEY = process.env.JWT_SECRET || "minha_chave_secreta";

// Limite de requisições (anti-brute force)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Limite de 100 requisições
  message: "Muitas requisições, tente novamente mais tarde.",
});
app.use(limiter);

// Rotas
//app.get("/", (req, res) => res.send("API de Autenticação com Node.js e MongoDB"));
app.get("/", (req, res) => res.send(`${moment().tz(process.env.TIMEZONE).toDate()}`));

// Rota de Registro
app.post("/register", async (req, res) => {
  const { username, email, fullname, password } = req.body;

  if (!username || !email|| !fullname || !password) {
    return res.status(400).json({ message: "Todos os campos são obrigatórios." });
  }

  try {
    // Verifica se o usuário já existe
    const existingUser = await User.findOne({ $or: [{ nome:username }, { email:email }] });

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
});

// Rota de Login
app.post("/login", async (req, res) => {
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
    const token = jwt.sign({ id: user._id, username: user.username }, SECRET_KEY, {
      expiresIn: "1h",
    });

    res.json({ message: "Login bem-sucedido!", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro no servidor." });
  }
});

// Middleware para autenticação JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token não fornecido." });
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: "Token inválido." });
    req.user = user;
    next();
  });
};

// Rota protegida
app.get("/protected", authenticateToken, (req, res) => {
  res.json({ message: "Bem-vindo à rota protegida!", user: req.user });
});

// Configuração do transportador de email
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,    
  },
});

// Rota para solicitar reset de senha
app.post("/reset-password", async (req, res) => {
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
});

// Rota para redefinir a senha
app.post("/reset-password/:token", async (req, res) => {
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
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.json({ message: "Senha redefinida com sucesso!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao redefinir senha." });
  }
});

// Inicializar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});