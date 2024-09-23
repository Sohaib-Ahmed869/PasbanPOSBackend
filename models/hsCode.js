const mongoose = require("mongoose");
// {
//   id: 2,
//   code: "654321",
//   gst: 0.13,
// },

const hsCodeSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
  gst: {
    type: Number,
    required: true,
  },
});

const HsCode = mongoose.model("HsCode", hsCodeSchema);

module.exports = HsCode;