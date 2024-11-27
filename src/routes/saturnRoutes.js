import express from "express";
import { listarTodosKPIs, buscaKPI } from "../controllers/kpisController.js";
import { buscaUsuario, listarTodosusuarios } from "../controllers/usersController.js";
// import cors from "cors";

// Configurações para o CORS (Cross-Origin Resource Sharing) - Habilita requisições de outras origens.
// const corsOptions = {
//   origin: "http://localhost:8000",
//   optionsSuccessStatus: 200,
// };


/**
 * Rota raiz da aplicação.
 * @param {Object} req - Objeto de requisição HTTP.
 * @param {Object} res - Objeto de resposta HTTP.
 */
export function index(req, res) {
  res.status(200).send("Raíz da rota KPI");
};

// Função para definir as rotas da aplicação.
const routes = (app) => {
  // Habilita o middleware express.json para interpretar o corpo das requisições como JSON.
  app.use(express.json());

  // Habilita o CORS com as configurações definidas em corsOptions.
  //app.use(cors(corsOptions));

  // Rota raiz ("/") - Chama a função `index` do controlador.
  app.get("/", index);

  // Rota para listar todos os KPIs ("/kpis") - Chama a função `listarTodosKPIs` do controlador de KPIs.
  app.get("/kpis", listarTodosKPIs);

  // Rota para recuperar um KPI existente ("/kpis/:id") - 
  // - O ":id" define um parâmetro dinâmico na URL.
  // - Chama a função `buscaKPI` do controlador de KPIs.
  app.get("/kpis/:id", buscaKPI);

  // Rota para listar todos os usuários ("/users") - Chama a função `listarTodosUsuarios` do controlador de usuários.
  app.get("/users", listarTodosusuarios);

  // Rota para recuperar um usuário existente ("/users/:id") - 
  // - O ":id" define um parâmetro dinâmico na URL.
  // - Chama a função `buscaUsuario` do controlador de usuários.
  app.get("/users/:id", buscaUsuario);
};

export default routes;