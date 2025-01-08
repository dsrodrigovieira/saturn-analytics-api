const jwt = require("jsonwebtoken");
require('dotenv').config();

const SECRET_KEY = process.env.JWT_SECRET

// Middleware para autenticação JWT
// async function authenticateToken (req, res, next) {
//     const authHeader = req.headers["authorization"];
//     const token = authHeader && authHeader.split(" ")[1];

//     if (!token) {
//         return res.status(401).json({ message: "Token não fornecido." });
//     }

//     jwt.verify(token, SECRET_KEY, (err, user) => {
//         if (err) return res.status(403).json({ message: "Token inválido." });
//         req.user = user;
//         next();
//     });
// };

function authenticateToken(req, res, next) {
    const token = req.cookies.authToken; // Recupera o token do cookie
  
    if (!token) {
      return res.status(401).json({ message: 'Acesso negado. Token ausente.' });
    }
  
    try {
      // Verifica e decodifica o token (substitua 'seu-segredo' pelo segredo real usado na geração do token)
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // Anexa os dados do usuário ao objeto `req` para uso posterior
      next(); // Continua para o próximo middleware ou rota
    } catch (error) {
      return res.status(403).json({ message: 'Token inválido.' });
    }
  }

module.exports = {default:authenticateToken};