const mongoose = require("mongoose");

const KpisSchema = new mongoose.Schema({
    sequencia: { type: Number, required: true },
    titulo: { type: String, required: true },
    unidade: { type: String, required: true },
    dominio: { type: String, required: true },
    descricao: { type: String, required: true },
    meta: { type: String, required: true },
    meta_valor: { type: Number, required: true},
    direcao: { type: String, required: true }
});

module.exports = mongoose.model("kpis", KpisSchema);