const express = require('express');
const router = express.Router();
const produkController = require('../controller/produkController');
const upload = require('../config/multerConfig')

router.route('/')
  .get(produkController.getData)
  .post(upload.array('FotoProduk',3),produkController.postData)
  
router.get('/:id',produkController.getDataById)
router.put('/:id',produkController.updateData)
router.delete('/:id',produkController.deleteData)

module.exports = router;