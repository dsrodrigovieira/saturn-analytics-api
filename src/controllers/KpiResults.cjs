const KpiResults = require("../models/KpiResults.cjs");

async function getKpiResults(req,res) {
    const organization_cnes = req.params.cnes;
    const month = req.params.month;
    const year = req.params.year;

    if (!organization_cnes && !month && !year) {
        return res.status(400).json({ message: "Informe a empresa, o ano e a competência." }); 
    }
    try {
        const kpis = await KpiResults.findOne({ $and: [ { organization_cnes:organization_cnes }, { year:year } , { month:month } ] }, {"_id":0})
        if (kpis){     
            return res.status(201).json({ message: kpis });
        } else {
            return res.status(400).json({ message: "KPIs da competência não encontrados." });    
        }
    } catch (err) {
        return res.status(500).json({ message: "Erro no servidor" });
    }    
}
module.exports = { getKpiResults };