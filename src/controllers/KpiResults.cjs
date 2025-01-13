// Importa o modelo de dados de resultados de KPIs
const KpiResults = require("../models/KpiResults.cjs");

// Função assíncrona para buscar os resultados de KPIs com base nos parâmetros fornecidos
async function getKpiResults(req, res) {
    // Obtém os parâmetros da URL (cnes, mês e ano)
    const organization_cnes = req.params.cnes;
    const month = req.params.month;           
    const year = req.params.year;             

    // Verifica se todos os parâmetros obrigatórios foram fornecidos
    if (!organization_cnes && !month && !year) {
        return res.status(400).json({ message: "Informe a empresa, o ano e a competência." }); 
    }

    try {
        const kpis = await KpiResults.findOne(
            { 
                $and: [ 
                    { organization_cnes: organization_cnes }, // Filtro por código da organização
                    { year: year },                           // Filtro por ano
                    { month: month }                          // Filtro por mês
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
module.exports = { getKpiResults };
