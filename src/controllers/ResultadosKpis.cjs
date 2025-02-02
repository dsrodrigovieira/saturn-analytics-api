// Importa o modelo de dados de resultados de KPIs
const ResultadosKpis = require("../models/ResultadosKpis.cjs");

// Função assíncrona para buscar os resultados de KPIs com base nos parâmetros fornecidos
async function getResultadosKpis(req, res) {
    // Obtém os parâmetros da URL (cd_cnes, mês e ano)
    const cd_cnes = req.params.cnes;
    const mes = req.params.mes;           
    const ano = req.params.ano;             

    // Verifica se todos os parâmetros obrigatórios foram fornecidos
    if (!cd_cnes && !mes && !ano) {
        return res.status(400).json({ message: "Informe a empresa, o ano e a competência." }); 
    }

    try {
        const kpis = await ResultadosKpis.findOne(
            { 
                $and: [ 
                    { cd_cnes: cd_cnes }, // Filtro por código da organização
                    { ano: ano },         // Filtro por ano
                    { mes: mes }          // Filtro por mês
                ] 
            }, 
            { "_id": 0 } // Exclui o campo _id do resultado
        );

        // Verifica se os resultados de KPIs foram encontrados
        if (kpis) {
            return res.status(201).json({ message: kpis });
        } else {
            return res.status(400).json({ message: "KPIs da competência não encontrados." });    
        }
    } catch (err) {
        // Retorna erro 500 (erro interno do servidor) em caso de falha na execução da consulta
        return res.status(500).json({ message: "Erro no servidor" });
    }    
}

// Exporta a função para que possa ser utilizada em outros módulos
module.exports = { getResultadosKpis };
