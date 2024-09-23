const express = require("express");
const hsCodeController = require('../controllers/hsCodeController');

const router = express.Router();

router.post('/', hsCodeController.addHsCode);
router.get('/', hsCodeController.getHsCodes);
router.put('/:id', hsCodeController.updateHsCodeGST);

module.exports = router;