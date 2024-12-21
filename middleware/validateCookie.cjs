const jwt = require("jsonwebtoken");

require('dotenv').config();

const SECRET_KEY = process.env.JWT_SECRET

async function validateCookie (req, res) {
  const token = req.cookies.authToken;

  if (!token) {
    return res.status(401).json({ message: "Token inválido ou expirado" });
  }
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    return res.status(200).json({ message: "Autenticado", user: decoded });
  } catch (err) {
    return res.status(401).json({ message: "Token inválido ou expirado" });
  }
}

module.exports = { default:validateCookie };