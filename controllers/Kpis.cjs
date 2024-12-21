const Kpis = require("../models/Kpis.cjs");

async function getKpis(req,res) {

    const projection = {
        _id: 0,
        titulo: 1,
        unidade: 1,
        dominio: 1,
        descricao: 1,
        meta: 1,
        meta_valor: 1,
        direcao: 1
    }

    try {
        const kpis = await Kpis.find({},projection)
        if (kpis){     
            return res.status(201).json({ message: kpis });
        } else {
            console.log(req.body)
            return res.status(400).json({ message: "KPIs não encontrados." });    
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Erro no servidor" });
    }    
}

module.exports = { getKpis };