const mongoose = require("mongoose");

// Define o esquema (schema) para a coleção "kpis" no MongoDB
const KpisSchema = new mongoose.Schema({
    sequencia: { type: Number, required: true },
    titulo: { type: String, required: true },
    unidade: { type: String, required: true },
    dominio: { type: String, required: true },
    descricao: { type: String, required: true },
    meta: { type: String, required: true },
    meta_valor: { type: Number, required: true },
    direcao: { type: String, required: true },
    //estratificacoes: { type: mongoose.Types.Subdocument, required: true },
    estratificacoes: []
});
// Esse modelo será utilizado para criar, ler, atualizar e excluir documentos na coleção "kpis"
module.exports = mongoose.model("kpis", KpisSchema);
