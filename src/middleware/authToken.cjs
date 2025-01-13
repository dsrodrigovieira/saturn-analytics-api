const jwt = require("jsonwebtoken");

require('dotenv').config();

// Função middleware para autenticar o token presente nos cookies
function authenticateToken(req, res, next) {
    // Recupera o token JWT armazenado no cookie 'authToken'
    const token = req.cookies.authToken;

    if (!token) {
        // Retorna um erro 401 (não autorizado) caso o token esteja ausente
        return res.status(401).json({ message: 'Acesso negado. Token ausente.' });
    }

    try {
        // Tenta verificar e decodificar o token usando
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Adiciona as informações decodificadas do token ao objeto `req`, permitindo acesso em outras partes da aplicação
        req.user = decoded;        
        next();
    } catch (error) {
        // Retorna um erro 403 (proibido) caso o token seja inválido
        return res.status(403).json({ message: 'Token inválido.' });
    }
}

// Exporta a função como padrão do módulo
module.exports = { default: authenticateToken };
