import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js";

// Estabelece a conexão com o banco de dados MongoDB usando a string de conexão fornecida.
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

/**
 * Função para obter todos os KPIs do banco de dados.
 *
 * @returns {Promise<Array>} - Um array de objetos representando os KPIs.
 */
export async function getTodosKPIs() {
  // Seleciona o banco de dados "saturnDB".
  const db = conexao.db("saturnDB");

  // Seleciona a coleção "kpis" dentro do banco de dados.
  const colecao = db.collection("kpis");

  // Busca todos os documentos da coleção e retorna um array de objetos.
  return colecao.find().toArray();
};

/**
 * Função para obter um KPI do banco de dados.
 *
 * @param {string} id - O ID do KPI a ser consultado.
 * @returns {Promise<UpdateResult>} - O resultado da operação de atualização.
 */
export async function getKPI(id) {
  // Seleciona o banco de dados "saturnDB".
  const db = conexao.db("saturnDB");

  // Seleciona a coleção "kpis" dentro do banco de dados.
  const colecao = db.collection("kpis");

  // Converte o ID do post em um objeto ObjectId do MongoDB.
  const objectID = ObjectId.createFromHexString(id);

  // Busca o KPI correspondente.
  return colecao.findOne({ _id: new ObjectId(objectID) });
};

/**
 * Função para obter todos os usuários do banco de dados.
 *
 * @returns {Promise<Array>} - Um array de objetos representando os usuários.
 */
export async function getTodosUsuarios() {
  // Seleciona o banco de dados "saturnDB".
  const db = conexao.db("saturnDB");

  // Seleciona a coleção "users" dentro do banco de dados.
  const colecao = db.collection("users");

  // Busca todos os documentos da coleção e retorna um array de objetos.
  return colecao.find().toArray();
};

/**
 * Função para obter um usuário do banco de dados.
 *
 * @param {string} id - O ID do usuário a ser consultado.
 * @returns {Promise<UpdateResult>} - O resultado da operação de atualização.
 */
export async function getUsuario(id) {
  // Seleciona o banco de dados "saturnDB".
  const db = conexao.db("saturnDB");

  // Seleciona a coleção "users" dentro do banco de dados.
  const colecao = db.collection("users");

  // Converte o ID do post em um objeto ObjectId do MongoDB.
  const objectID = ObjectId.createFromHexString(id);

  // Busca o KPI correspondente.
  return colecao.findOne({ _id: new ObjectId(objectID) });
};