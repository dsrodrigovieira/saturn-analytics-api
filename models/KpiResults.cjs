const mongoose = require("mongoose");

const KpiResultsSchema = new mongoose.Schema({
  organization_cnes: { type: Number, required: true },
  year: { type: Number, required: true },
  month: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  rkpi_1: { 
    value: { type: Number, required: true, default: null },
    estratification: []
  },
  rkpi_2: {
    value: { type: Number, required: true, default: null },
    estratification: [
      { type: "clinico", value: { type: Number } },
      { type: "cirurgico", value: { type: Number } }
    ]
  },
  rkpi_3: { 
    value: { type: Number, required: true, default: null },
    estratification: []
  },
  rkpi_4: {
    value: { type: Number, required: true, default: null },
    estratification: [
      { type: "cli_neo_precoce", value: { type: Number } },
      { type: "cli_neo_tardio", value: { type: Number } },
      { type: "cli_pedi", value: { type: Number } },
      { type: "cli_ad", value: { type: Number } },
      { type: "cli_idoso", value: { type: Number } },
      { type: "cir_neo_precoce", value: { type: Number } },
      { type: "cir_neo_tardio", value: { type: Number } },
      { type: "cir_pedi", value: { type: Number } },
      { type: "cir_ad", value: { type: Number } },
      { type: "cir_idoso", value: { type: Number } },
      { type: "clinico", value: { type: Number } },
      { type: "cirurgico", value: { type: Number } },
      { type: "neo_precoce", value: { type: Number } },
      { type: "neo_tardio", value: { type: Number } },
      { type: "pedi", value: { type: Number } },
      { type: "ad", value: { type: Number } },
      { type: "idoso", value: { type: Number } }
    ]
  },
  rkpi_5: {
    value: { type: Number, required: true, default: null },
    estratification: [
      { type: "cli_pedi", value: { type: Number } },
      { type: "cli_ad", value: { type: Number } },
      { type: "cli_idoso", value: { type: Number } },
      { type: "cir_pedi", value: { type: Number } },
      { type: "cir_ad", value: { type: Number } },
      { type: "cir_idoso", value: { type: Number } },
      { type: "clinico", value: { type: Number } },
      { type: "cirurgico", value: { type: Number } },
      { type: "pedi", value: { type: Number } },
      { type: "ad", value: { type: Number } },
      { type: "idoso", value: { type: Number } }
    ]
  },
  rkpi_6: { 
    value: { type: Number, required: true, default: null },
    estratification: []
  },
  rkpi_7: {
    value: { type: Number, required: true, default: null },
    estratification: [
      { type: "nvl2", value: { type: Number } },
      { type: "nvl3", value: { type: Number } }
    ]
  },
  rkpi_8: { 
    value: { type: Number, required: true, default: null },
    estratification: []
  },
  rkpi_9: { 
    value: { type: Number, required: true, default: null },
    estratification: []
  },
  rkpi_10: {
    value: { type: Number, required: true, default: null },
    estratification: [
      { type: "ui_neo", value: { type: Number } },
      { type: "ui_pedi", value: { type: Number } },
      { type: "ui_ad", value: { type: Number } },
      { type: "uti_neo", value: { type: Number } },
      { type: "uti_pedi", value: { type: Number } },
      { type: "uti_ad", value: { type: Number } },
      { type: "neo", value: { type: Number } },
      { type: "pedi", value: { type: Number } },
      { type: "ad", value: { type: Number } },
      { type: "ui", value: { type: Number } },
      { type: "uti", value: { type: Number } }
    ]
  },
  rkpi_11: {
    value: { type: Number, required: true, default: null },
    estratification: [
      { type: "ui_neo", value: { type: Number } },
      { type: "ui_pedi", value: { type: Number } },
      { type: "ui_ad", value: { type: Number } },
      { type: "uti_neo", value: { type: Number } },
      { type: "uti_pedi", value: { type: Number } },
      { type: "uti_ad", value: { type: Number } },
      { type: "neo", value: { type: Number } },
      { type: "pedi", value: { type: Number } },
      { type: "ad", value: { type: Number } },
      { type: "ui", value: { type: Number } },
      { type: "uti", value: { type: Number } }
    ]
  },
  rkpi_12: {
    value: { type: Number, required: true, default: null },
    estratification: [
      { type: "cir_orto", value: { type: Number } },
      { type: "cir_n_orto", value: { type: Number } },
      { type: "cirurgico", value: { type: Number } }
    ]
  },
  rkpi_13: { 
    value: { type: Number, required: true, default: null },
    estratification: []
  },
  rkpi_14: { 
    value: { type: Number, required: true, default: null },
    estratification: []
  }
});

module.exports = mongoose.model("kpi_results", KpiResultsSchema);

