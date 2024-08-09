const express = require('express');
const router = express.Router();
const pelangganController = require('../controller/pelangganController')

router.route('/')
  .get(pelangganController.getData)
  .post(pelangganController.postData)

router.put('/:id',pelangganController.updateData)

router.delete('/:id',pelangganController.deleteData)

module.exports = router;