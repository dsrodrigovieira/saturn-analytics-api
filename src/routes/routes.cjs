const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const moment = require("moment-timezone");
const express = require("express");
const cookieParser = require('cookie-parser');

// Importa os controladores das rotas de usuários e KPIs
const { registerNewUser, deleteUser, signInUser, requestResetUserPassword, resetUserPassword, getUser, logoff } = require("../controllers/Users.cjs");
const { default: authenticateToken } = require("../middleware/authToken.cjs"); // Middleware para autenticação via token
const { default: validateCookie } = require("../middleware/validateCookie.cjs"); // Middleware para validação de cookies
const { getKpiResults } = require("../controllers/KpiResults.cjs"); // Controlador para obter resultados de KPIs
const { getKpis } = require("../controllers/Kpis.cjs"); // Controlador para obter a lista de KPIs

// Configuração das opções do CORS
const corsOptions = {
    origin: process.env.CORS_APP,
    credentials: true,
    optionsSuccessStatus: 200,
};

// Configuração do middleware de limite de requisições
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // Janela de tempo de 15 minutos
    max: 100,
    message: "Muitas requisições, tente novamente mais tarde.",
});

// Função que define as rotas da aplicação
const routes = (app) => {
    // Adiciona middlewares globais à aplicação
    app.use(helmet());
    app.use(cors(corsOptions));
    app.use(express.json());
    app.use(limiter);
    app.use(cookieParser());

    // Define as rotas da aplicação
    app.get("/", (req, res) => res.send(`${moment().tz(process.env.TIMEZONE).toDate()}`)); // Rota raiz que retorna a data atual no fuso horário definido
    app.post("/register", registerNewUser); // Rota para registrar novos usuários
    app.get("/users", authenticateToken, getUser); // Rota para obter informações de usuários (requer autenticação)
    app.delete("/register", authenticateToken, deleteUser); // Rota para deletar usuários registrados (requer autenticação)
    app.post("/auth", signInUser); // Rota para autenticação de usuários
    app.get("/auth/validate", validateCookie); // Rota para validação de cookies de autenticação
    app.post("/reset-password", requestResetUserPassword); // Rota para solicitar redefinição de senha
    app.post("/reset-password/:token", resetUserPassword); // Rota para redefinir a senha usando um token
    app.post('/logout', logoff); // Rota para logout de usuários
    app.get('/results/:cnes/:year/:month', authenticateToken, getKpiResults); // Rota para obter resultados de KPIs (requer autenticação)
    app.get('/kpi', authenticateToken, getKpis); // Rota para obter a lista de KPIs (requer autenticação)
};

// Exporta as rotas como padrão do módulo
module.exports = { default: routes };
