import { getTodosKPIs, getKPI } from "../models/saturnModel.js";

/**
 * Rota para listar todos os KPIs.
 * @param {Object} req - Objeto de requisição HTTP.
 * @param {Object} res - Objeto de resposta HTTP.
 */
export async function listarTodosKPIs(req, res) {
    try {
        const resultados = await getTodosKPIs();
        res.status(200).json(resultados);
    } catch(erro) {
        // Caso ocorra algum erro durante o processo , loga o erro no console e retorna
        // uma resposta HTTP 500 com uma mensagem genérica de erro.
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"});
    }
};

/**
 * Rota para buscar um KPI.
 * @param {Object} req - Objeto de requisição HTTP.
 * @param {Object} res - Objeto de resposta HTTP.
 */
export async function buscaKPI(req, res) {
    try {
        // Obtém o ID do post a ser atualizado a partir dos parâmetros da requisição.
        const id = req.params.id;
        const resultados = await getKPI(id);
        res.status(200).json(resultados);
    } catch(erro) {
        // Caso ocorra algum erro durante o processo , loga o erro no console e retorna
        // uma resposta HTTP 500 com uma mensagem genérica de erro.
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"});
    }
};