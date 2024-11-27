import { MongoClient } from "mongodb";

/**
 * Função assíncrona para conectar ao banco de dados MongoDB.
 * 
 * @param {string} stringConexao - String de conexão para o banco de dados.
 * @returns {MongoClient} - Objeto MongoClient para interagir com o banco.
 */
export default async function conectarAoBanco(stringConexao) {
  let mongoClient;

  try {
    // Cria um novo cliente MongoDB usando a string de conexão fornecida.
    mongoClient = new MongoClient(stringConexao);

    // Tenta estabelecer a conexão com o cluster do banco de dados.
    console.log("Conectando ao cluster do banco de dados");
    await mongoClient.connect();

    // Se a conexão for bem-sucedida, exibe uma mensagem de sucesso e retorna o cliente.
    console.log("Conectado ao MongoDB Atlas com sucesso!");
    return mongoClient;
  } catch (e) {
    // Caso ocorra algum erro durante a conexão, exibe uma mensagem de erro detalhada
    // e encerra o processo.
    console.error("Falha na conexão com o banco!", e);
    process.exit();
  }
}