const KpiResults = require("../models/KpiResults.cjs");

async function getKpiResults(req,res) {
    const { organization_cnes, month, year } = req.body;
    if (!organization_cnes && !month && !year) {
        return res.status(400).json({ message: "Informe empresa, ano e competência." }); 
    }
    try {
        const kpis = await KpiResults.findOne({ $and: [ { organization_cnes:organization_cnes }, { year:year } , { month:month } ] }, {"_id":0})
        if (kpis){     
            return res.status(201).json({ message: kpis });
        } else {
            //console.log(req.body)
            return res.status(400).json({ message: "KPIs da competência não encontrados." });    
        }
    } catch (err) {
        //console.error(err);
        return res.status(500).json({ message: "Erro no servidor" });
    }    
}

module.exports = { getKpiResults };