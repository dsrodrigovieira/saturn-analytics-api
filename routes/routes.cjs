const jwt = require("jsonwebtoken");
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const moment = require("moment-timezone");
const express = require("express");
const { registerNewUser, deleteUser, signInUser, requestResetUserPassword, resetUserPassword, getUser } = require("../controllers/Users.cjs");

// Configurações para o CORS (Cross-Origin Resource Sharing) - Habilita requisições de outras origens.
const corsOptions = {
    origin: "http://localhost:8000",
    optionsSuccessStatus: 200,
};

// Configuração JWT
const SECRET_KEY = process.env.JWT_SECRET || "minha_chave_secreta";

// Limite de requisições (anti-brute force)
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // Limite de 100 requisições
    message: "Muitas requisições, tente novamente mais tarde.",
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
  
// Função para definir as rotas da aplicação.
const routes = (app) => {

    // Middleware de segurança e parse de JSON
    app.use(helmet());
    app.use(cors());
    app.use(express.json());
    app.use(limiter);

    // Rota raíz
    app.get("/", (req, res) => res.send(`${moment().tz(process.env.TIMEZONE).toDate()}`));

    // Rota de Registro
    app.post("/register", registerNewUser);

    // Rota
    app.get("/users", authenticateToken, getUser);

    // Rota de Exclusão
    app.delete("/register", authenticateToken, deleteUser);

    // Rota de Login
    app.post("/login", signInUser);

    // Rota para solicitar reset de senha
    app.post("/reset-password", requestResetUserPassword);

    // Rota para redefinir a senha
    app.post("/reset-password/:token", resetUserPassword);

};

module.exports = { default: routes };