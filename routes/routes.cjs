const jwt = require("jsonwebtoken");
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const moment = require("moment-timezone");
const express = require("express");
const cookieParser = require('cookie-parser');
const { registerNewUser, deleteUser, signInUser, requestResetUserPassword, resetUserPassword, getUser, logoff, validateCookie } = require("../controllers/Users.cjs");
const {default:authenticateToken} = require("../middleware/authToken.cjs");

// Configurações para o CORS (Cross-Origin Resource Sharing) - Habilita requisições de outras origens.
const corsOptions = {
    origin: "http://localhost:5500",
    credentials: true, // Permite o envio de cookies e credenciais
    optionsSuccessStatus: 200,
};

// Limite de requisições (anti-brute force)
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // Limite de 100 requisições
    message: "Muitas requisições, tente novamente mais tarde.",
});
  
// Função para definir as rotas da aplicação.
const routes = (app) => {

    // Middleware de segurança, parse de JSON e cookies
    app.use(helmet());
    app.use(cors(corsOptions));
    app.use(express.json());
    app.use(limiter);
    app.use(cookieParser());

    // Rota raíz
    app.get("/", (req, res) => res.send(`${moment().tz(process.env.TIMEZONE).toDate()}`));

    // Rota de Registro
    app.post("/register", registerNewUser);

    // Rota
    app.get("/users", authenticateToken, getUser);

    // Rota de Exclusão
    app.delete("/register", authenticateToken, deleteUser);

    // Rota de Autenticacao
    app.post("/auth", signInUser);

    // Rota de validação do cookie (dev)
    app.get("/auth/validate", validateCookie);

    // Rota para solicitar reset de senha
    app.post("/reset-password", requestResetUserPassword);

    // Rota para redefinir a senha
    app.post("/reset-password/:token", resetUserPassword);

    // Rota para logout
    app.post('/logout', logoff);

};

module.exports = { default: routes };