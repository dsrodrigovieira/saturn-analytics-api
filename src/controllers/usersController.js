import { getTodosUsuarios, getUsuario } from "../models/saturnModel.js";

/**
 * Rota para listar todos os usuários.
 * @param {Object} req - Objeto de requisição HTTP.
 * @param {Object} res - Objeto de resposta HTTP.
 */
export async function listarTodosusuarios(req, res) {
    try {
        const resultados = await getTodosUsuarios();
        res.status(200).json(resultados);
    } catch(erro) {
        // Caso ocorra algum erro durante o processo , loga o erro no console e retorna
        // uma resposta HTTP 500 com uma mensagem genérica de erro.
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"});
    }
};

/**
 * Rota para buscar um usuário.
 * @param {Object} req - Objeto de requisição HTTP.
 * @param {Object} res - Objeto de resposta HTTP.
 */
export async function buscaUsuario(req, res) {
    try {
        // Obtém o ID do post a ser atualizado a partir dos parâmetros da requisição.
        const id = req.params.id;
        const resultados = await getUsuario(id);
        res.status(200).json(resultados);
    } catch(erro) {
        // Caso ocorra algum erro durante o processo , loga o erro no console e retorna
        // uma resposta HTTP 500 com uma mensagem genérica de erro.
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"});
    }
};