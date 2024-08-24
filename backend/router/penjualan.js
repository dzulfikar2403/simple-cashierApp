const express = require('express');
const router = express.Router();
const penjualanController = require('../controller/penjualanController')

router.route('/')
  .get(penjualanController.getData)
  .post(penjualanController.postData)

router.get('/:id',penjualanController.getDataById)
router.delete('/:id',penjualanController.deleteData)

module.exports = router;