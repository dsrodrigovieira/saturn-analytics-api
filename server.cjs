const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { default: routes } = require("./src/routes/routes.cjs");

// Carrega as variáveis de ambiente
dotenv.config();

// Define a porta padrão para o servidor
const PORT = process.env.PORT || 3000;

// Inicializa o Express
const app = express();

// Configura as rotas para a aplicação
routes(app);

// Conecta ao banco de dados MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Conectado ao MongoDB")) // Loga sucesso na conexão
  .catch((err) => console.error("Erro ao conectar ao MongoDB:", err)); // Loga erros na conexão

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
