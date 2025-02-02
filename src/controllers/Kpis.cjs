// Importa o modelo de dados de KPIs
const Kpis = require("../models/Kpis.cjs");

// Função assíncrona para buscar e retornar os KPIs
async function getKpis(req, res) {
    // Define os campos que serão retornados na consulta (projeção)
    const projection = {
        _id: 0,         
        sequencia: 1,   
        titulo: 1,      
        unidade: 1,     
        dominio: 1,     
        descricao: 1,   
        meta: 1,        
        meta_valor: 1,  
        direcao: 1,
        estratificacoes: 1     
    };

    try {
        // Busca todos os KPIs no banco de dados aplicando a projeção e ordenando pelo campo 'sequencia'
        const kpis = await Kpis.find({}, projection).sort({ sequencia: 1 });

        // Verifica se os KPIs foram encontrados
        if (kpis) {
            return res.status(201).json({ message: kpis });
        } else {
            return res.status(400).json({ message: "KPIs não encontrados." });    
        }
    } catch (err) {
        // Retorna erro 500 (erro interno do servidor) em caso de falha na consulta
        return res.status(500).json({ message: "Erro no servidor" });
    }    
}

// Exporta a função para ser usada em outros módulos
module.exports = { getKpis };
