const Kpis = require("../models/Kpis.cjs");

async function getKpis(req,res) {
    try {
        const kpis = await Kpis.find( {"_id":0} )
        if (kpis){     
            return res.status(201).json({ message: kpis });
        } else {
            //console.log(req.body)
            return res.status(400).json({ message: "KPIs não encontrados." });    
        }
    } catch (err) {
        //console.error(err);
        return res.status(500).json({ message: "Erro no servidor" });
    }    
}

module.exports = { getKpis };