const jwt = require("jsonwebtoken");

require('dotenv').config();

const SECRET_KEY = process.env.JWT_SECRET;

// Função para validar o cookie de autenticação
async function validateCookie(req, res) {
  // Recupera o token JWT armazenado no cookie 'authToken'
  const token = req.cookies.authToken;

  if (!token) {
    // Retorna um erro 401 (não autorizado) caso o token esteja ausente
    return res.status(401).json({ message: "Token inválido ou expirado" });
  }

  try {
    // Tenta verificar e decodificar o token usando a chave secreta
    const decoded = jwt.verify(token, SECRET_KEY);
    // Retorna uma resposta de sucesso com o usuário decodificado
    return res.status(200).json({ message: "Autenticado", user: decoded });
  } catch (err) {
    // Retorna um erro 401 caso o token seja inválido ou tenha expirado
    return res.status(401).json({ message: "Token inválido ou expirado" });
  }
}

// Exporta a função como padrão do módulo
module.exports = { default: validateCookie };
