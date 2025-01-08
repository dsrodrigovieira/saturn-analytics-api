const jwt = require("jsonwebtoken");
require('dotenv').config();

function authenticateToken(req, res, next) {
    const token = req.cookies.authToken; // Recupera o token do cookie  
    if (!token) {
      return res.status(401).json({ message: 'Acesso negado. Token ausente.' });
    }  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // Anexa os dados do usuário ao objeto `req` para uso posterior
      next(); // Continua para o próximo middleware ou rota
    } catch (error) {
      return res.status(403).json({ message: 'Token inválido.' });
    }
  }

module.exports = {default:authenticateToken};