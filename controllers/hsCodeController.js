const hsCode = require("../models/hsCode");

//controllers for adding, getting and updating hsCodes

const hsCodeController = {
  async addHsCode(req, res) {
    console.log(req.body);
    //{ hscode: { code: '1', gst: '11' } }

    try {

      const newHScode = new hsCode(req.body.hscode);
      if (!newHScode) {
        return res.status(400).send({ error: "Invalid data" });
      }
      await newHScode.save();
      return res.status(201).send({ newHScode });
    } catch (error) {
      console.log(error);
      return res.status(400).send({ error: "Failed to add hsCode" });
    }
  },
  async getHsCodes(req, res) {
    try {
      const hsCodes = await hsCode.find();
      return res.status(200).send({ hsCodes });
    } catch (error) {
      return res.status(400).send({ error: "Failed to fetch hsCodes" });
    }
  },
  async updateHsCodeGST(req, res) {
    try {
      console.log(req.body);
      const newGST = req.body.hscode.gst;
      console.log(newGST);
      const edithsCode = await hsCode.findByIdAndUpdate(req.params.id, { gst: newGST }, { new: true });
      console.log(edithsCode);
      if (!edithsCode) {
        console.log("hsCode not found");
        return res.status(404).send({ error: "HsCode not found" });
      }
      return res.status(200).send({ edithsCode });
    }
    catch (error) {
      console.log(error);
      return res.status(400).send({ error: "Failed to update hsCode" });
    }
  },
};

module.exports = hsCodeController;