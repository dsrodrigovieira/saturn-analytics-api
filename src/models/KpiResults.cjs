const mongoose = require("mongoose");

// Define o esquema (schema) para a coleção "kpi_results" no MongoDB
const KpiResultsSchema = new mongoose.Schema({
  organization_cnes: { type: Number, required: true },
  year: { type: Number, required: true },
  month: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  data: {
    rkpi_1: { 
      value: { type: Number, required: true, default: null },
      variation: { type: String, required: true, default: "c" },
      estratification: []
    },
    rkpi_2: {
      value: { type: Number, required: true, default: null },
      variation: { type: String, required: true, default: "c" },
      estratification: [
        { type: {type:String, default:"clinico"}, value: { type: Number } },
        { type: {type:String, default:"cirurgico"}, value: { type: Number } }
      ]
    },
    rkpi_3: { 
      value: { type: Number, required: true, default: null },
      variation: { type: String, required: true, default: "c" },
      estratification: []
    },
    rkpi_4: {
      value: { type: Number, required: true, default: null },
      variation: { type: String, required: true, default: "c" },
      estratification: [
        { type: {type:String, default:"cli_neo_precoce"}, value: { type: Number } },
        { type: {type:String, default:"cli_neo_tardio"}, value: { type: Number } },
        { type: {type:String, default:"cli_pedi"}, value: { type: Number } },
        { type: {type:String, default:"cli_ad"}, value: { type: Number } },
        { type: {type:String, default:"cli_idoso"}, value: { type: Number } },
        { type: {type:String, default:"cir_neo_precoce"}, value: { type: Number } },
        { type: {type:String, default:"cir_neo_tardio"}, value: { type: Number } },
        { type: {type:String, default:"cir_pedi"}, value: { type: Number } },
        { type: {type:String, default:"cir_ad"}, value: { type: Number } },
        { type: {type:String, default:"cir_idoso"}, value: { type: Number } },
        { type: {type:String, default:"clinico"}, value: { type: Number } },
        { type: {type:String, default:"cirurgico"}, value: { type: Number } },
        { type: {type:String, default:"neo_precoce"}, value: { type: Number } },
        { type: {type:String, default:"neo_tardio"}, value: { type: Number } },
        { type: {type:String, default:"pedi"}, value: { type: Number } },
        { type: {type:String, default:"ad"}, value: { type: Number } },
        { type: {type:String, default:"idoso"}, value: { type: Number } }
      ]
    },
    rkpi_5: {
      value: { type: Number, required: true, default: null },
      variation: { type: String, required: true, default: "c" },
      estratification: [
        { type: {type:String, default:"cli_pedi"}, value: { type: Number } },
        { type: {type:String, default:"cli_ad"}, value: { type: Number } },
        { type: {type:String, default:"cli_idoso"}, value: { type: Number } },
        { type: {type:String, default:"cir_pedi"}, value: { type: Number } },
        { type: {type:String, default:"cir_ad"}, value: { type: Number } },
        { type: {type:String, default:"cir_idoso"}, value: { type: Number } },
        { type: {type:String, default:"clinico"}, value: { type: Number } },
        { type: {type:String, default:"cirurgico"}, value: { type: Number } },
        { type: {type:String, default:"pedi"}, value: { type: Number } },
        { type: {type:String, default:"ad"}, value: { type: Number } },
        { type: {type:String, default:"idoso"}, value: { type: Number } }
      ]
    },
    rkpi_6: { 
      value: { type: Number, required: true, default: null },
      variation: { type: String, required: true, default: "c" },
      estratification: []
    },
    rkpi_7: {
      value: { type: Number, required: true, default: null },
      variation: { type: String, required: true, default: "c" },
      estratification: [
        { type: {type:String, default:"nvl2"}, value: { type: Number } },
        { type: {type:String, default:"nvl3"}, value: { type: Number } }
      ]
    },
    rkpi_8: { 
      value: { type: Number, required: true, default: null },
      variation: { type: String, required: true, default: "c" },
      estratification: []
    },
    rkpi_9: { 
      value: { type: Number, required: true, default: null },
      variation: { type: String, required: true, default: "c" },
      estratification: []
    },
    rkpi_10: {
      value: { type: Number, required: true, default: null },
      variation: { type: String, required: true, default: "c" },
      estratification: [
        { type: {type:String, default:"ui_neo"}, value: { type: Number } },
        { type: {type:String, default:"ui_pedi"}, value: { type: Number } },
        { type: {type:String, default:"ui_ad"}, value: { type: Number } },
        { type: {type:String, default:"uti_neo"}, value: { type: Number } },
        { type: {type:String, default:"uti_pedi"}, value: { type: Number } },
        { type: {type:String, default:"uti_ad"}, value: { type: Number } },
        { type: {type:String, default:"neo"}, value: { type: Number } },
        { type: {type:String, default:"pedi"}, value: { type: Number } },
        { type: {type:String, default:"ad"}, value: { type: Number } },
        { type: {type:String, default:"ui"}, value: { type: Number } },
        { type: {type:String, default:"uti"}, value: { type: Number } }
      ]
    },
    rkpi_11: {
      value: { type: Number, required: true, default: null },
      variation: { type: String, required: true, default: "c" },
      estratification: [
        { type: {type:String, default:"ui_neo"}, value: { type: Number } },
        { type: {type:String, default:"ui_pedi"}, value: { type: Number } },
        { type: {type:String, default:"ui_ad"}, value: { type: Number } },
        { type: {type:String, default:"uti_neo"}, value: { type: Number } },
        { type: {type:String, default:"uti_pedi"}, value: { type: Number } },
        { type: {type:String, default:"uti_ad"}, value: { type: Number } },
        { type: {type:String, default:"neo"}, value: { type: Number } },
        { type: {type:String, default:"pedi"}, value: { type: Number } },
        { type: {type:String, default:"ad"}, value: { type: Number } },
        { type: {type:String, default:"ui"}, value: { type: Number } },
        { type: {type:String, default:"uti"}, value: { type: Number } }
      ]
    },
    rkpi_12: {
      value: { type: Number, required: true, default: null },
      variation: { type: String, required: true, default: "c" },
      estratification: [
        { type: {type:String, default:"cir_orto"}, value: { type: Number } },
        { type: {type:String, default:"cir_n_orto"}, value: { type: Number } },
        { type: {type:String, default:"cirurgico"}, value: { type: Number } }
      ]
    },
    rkpi_13: { 
      value: { type: Number, required: true, default: null },
      variation: { type: String, required: true, default: "c" },
      estratification: []
    },
    rkpi_14: { 
      value: { type: Number, required: true, default: null },
      variation: { type: String, required: true, default: "c" },
      estratification: []
    }
  }
});

// Exporta o modelo "kpi_results" baseado no esquema definido acima
// Esse modelo será utilizado para criar, ler, atualizar e excluir documentos na coleção "kpi_results"
module.exports = mongoose.model("kpi_results", KpiResultsSchema);

