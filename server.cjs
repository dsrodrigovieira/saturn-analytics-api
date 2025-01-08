const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const {default: routes} = require("./src/routes/routes.cjs");

dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();
routes(app);

// Conectar ao MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Conectado ao MongoDB"))
  .catch((err) => console.error("Erro ao conectar ao MongoDB:", err));
// Inicializar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});