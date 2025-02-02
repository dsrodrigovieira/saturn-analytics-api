const mongoose = require("mongoose");

// Define o esquema (schema) para a coleção "resultados_kpis" no MongoDB
const ResultadosKpisSchema = new mongoose.Schema({
  cd_cnes: { type: Number, required: true },
  ano: { type: Number, required: true },
  mes: { type: Number, required: true },
  dados: {
    rkpi_1: { 
      valor: { type: Number, required: true, default: null },
      variacao: { type: String, required: true, default: "c" },
      estratificacao: []
    },
    rkpi_2: {
      valor: { type: Number, required: true, default: null },
      variacao: { type: String, required: true, default: "c" },
      estratificacao: [
        { tipo: {type:String, default:"clinico"}, valor: { type: Number } },
        { tipo: {type:String, default:"cirurgico"}, valor: { type: Number } }
      ]
    },
    rkpi_3: { 
      valor: { type: Number, required: true, default: null },
      variacao: { type: String, required: true, default: "c" },
      estratificacao: []
    },
    rkpi_4: {
      valor: { type: Number, required: true, default: null },
      variacao: { type: String, required: true, default: "c" },
      estratificacao: [
        { tipo: {type:String, default:"cli_neo_precoce"}, valor: { type: Number } },
        { tipo: {type:String, default:"cli_neo_tardio"}, valor: { type: Number } },
        { tipo: {type:String, default:"cli_pedi"}, valor: { type: Number } },
        { tipo: {type:String, default:"cli_ad"}, valor: { type: Number } },
        { tipo: {type:String, default:"cli_idoso"}, valor: { type: Number } },
        { tipo: {type:String, default:"cir_neo_precoce"}, valor: { type: Number } },
        { tipo: {type:String, default:"cir_neo_tardio"}, valor: { type: Number } },
        { tipo: {type:String, default:"cir_pedi"}, valor: { type: Number } },
        { tipo: {type:String, default:"cir_ad"}, valor: { type: Number } },
        { tipo: {type:String, default:"cir_idoso"}, valor: { type: Number } },
        { tipo: {type:String, default:"clinico"}, valor: { type: Number } },
        { tipo: {type:String, default:"cirurgico"}, valor: { type: Number } },
        { tipo: {type:String, default:"neo_precoce"}, valor: { type: Number } },
        { tipo: {type:String, default:"neo_tardio"}, valor: { type: Number } },
        { tipo: {type:String, default:"pedi"}, valor: { type: Number } },
        { tipo: {type:String, default:"ad"}, valor: { type: Number } },
        { tipo: {type:String, default:"idoso"}, valor: { type: Number } }
      ]
    },
    rkpi_5: {
      valor: { type: Number, required: true, default: null },
      variacao: { type: String, required: true, default: "c" },
      estratificacao: [
        { tipo: {type:String, default:"cli_pedi"}, valor: { type: Number } },
        { tipo: {type:String, default:"cli_ad"}, valor: { type: Number } },
        { tipo: {type:String, default:"cli_idoso"}, valor: { type: Number } },
        { tipo: {type:String, default:"cir_pedi"}, valor: { type: Number } },
        { tipo: {type:String, default:"cir_ad"}, valor: { type: Number } },
        { tipo: {type:String, default:"cir_idoso"}, valor: { type: Number } },
        { tipo: {type:String, default:"clinico"}, valor: { type: Number } },
        { tipo: {type:String, default:"cirurgico"}, valor: { type: Number } },
        { tipo: {type:String, default:"pedi"}, valor: { type: Number } },
        { tipo: {type:String, default:"ad"}, valor: { type: Number } },
        { tipo: {type:String, default:"idoso"}, valor: { type: Number } }
      ]
    },
    rkpi_6: { 
      valor: { type: Number, required: true, default: null },
      variacao: { type: String, required: true, default: "c" },
      estratificacao: []
    },
    rkpi_7: {
      valor: { type: Number, required: true, default: null },
      variacao: { type: String, required: true, default: "c" },
      estratificacao: [
        { tipo: {type:String, default:"nvl2"}, valor: { type: Number } },
        { tipo: {type:String, default:"nvl3"}, valor: { type: Number } }
      ]
    },
    rkpi_8: { 
      valor: { type: Number, required: true, default: null },
      variacao: { type: String, required: true, default: "c" },
      estratificacao: []
    },
    rkpi_9: { 
      valor: { type: Number, required: true, default: null },
      variacao: { type: String, required: true, default: "c" },
      estratificacao: []
    },
    rkpi_10: {
      valor: { type: Number, required: true, default: null },
      variacao: { type: String, required: true, default: "c" },
      estratificacao: [
        { tipo: {type:String, default:"ui_neo"}, valor: { type: Number } },
        { tipo: {type:String, default:"ui_pedi"}, valor: { type: Number } },
        { tipo: {type:String, default:"ui_ad"}, valor: { type: Number } },
        { tipo: {type:String, default:"uti_neo"}, valor: { type: Number } },
        { tipo: {type:String, default:"uti_pedi"}, valor: { type: Number } },
        { tipo: {type:String, default:"uti_ad"}, valor: { type: Number } },
        { tipo: {type:String, default:"neo"}, valor: { type: Number } },
        { tipo: {type:String, default:"pedi"}, valor: { type: Number } },
        { tipo: {type:String, default:"ad"}, valor: { type: Number } },
        { tipo: {type:String, default:"ui"}, valor: { type: Number } },
        { tipo: {type:String, default:"uti"}, valor: { type: Number } }
      ]
    },
    rkpi_11: {
      valor: { type: Number, required: true, default: null },
      variacao: { type: String, required: true, default: "c" },
      estratificacao: [
        { tipo: {type:String, default:"ui_neo"}, valor: { type: Number } },
        { tipo: {type:String, default:"ui_pedi"}, valor: { type: Number } },
        { tipo: {type:String, default:"ui_ad"}, valor: { type: Number } },
        { tipo: {type:String, default:"uti_neo"}, valor: { type: Number } },
        { tipo: {type:String, default:"uti_pedi"}, valor: { type: Number } },
        { tipo: {type:String, default:"uti_ad"}, valor: { type: Number } },
        { tipo: {type:String, default:"neo"}, valor: { type: Number } },
        { tipo: {type:String, default:"pedi"}, valor: { type: Number } },
        { tipo: {type:String, default:"ad"}, valor: { type: Number } },
        { tipo: {type:String, default:"ui"}, valor: { type: Number } },
        { tipo: {type:String, default:"uti"}, valor: { type: Number } }
      ]
    },
    rkpi_12: {
      valor: { type: Number, required: true, default: null },
      variacao: { type: String, required: true, default: "c" },
      estratificacao: [
        { tipo: {type:String, default:"cir_orto"}, valor: { type: Number } },
        { tipo: {type:String, default:"cir_n_orto"}, valor: { type: Number } },
        { tipo: {type:String, default:"cirurgico"}, valor: { type: Number } }
      ]
    },
    rkpi_13: { 
      valor: { type: Number, required: true, default: null },
      variacao: { type: String, required: true, default: "c" },
      estratificacao: []
    },
    rkpi_14: { 
      valor: { type: Number, required: true, default: null },
      variacao: { type: String, required: true, default: "c" },
      estratificacao: []
    }
  }
});

// Esse modelo será utilizado para criar, ler, atualizar e excluir documentos na coleção "resultados_kpis"
module.exports = mongoose.model("resultados_kpis", ResultadosKpisSchema);

