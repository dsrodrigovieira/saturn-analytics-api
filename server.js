import express from "express";
import routes from "./src/routes/saturnRoutes.js";

// Cria uma instância do aplicativo Express.
const app = express();

// Carrega as rotas definidas no arquivo postsRoutes.js.
routes(app);

// Inicia o servidor na porta 3000 e exibe uma mensagem no console.
app.listen(4000, () => {
    console.log("Servidor ouvindo na porta 4000...");
});