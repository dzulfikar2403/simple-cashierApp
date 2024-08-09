const mongoose = require('mongoose');

const produkSchema = new mongoose.Schema({
  NamaProduk: String,
  Thumbnail: String,
  FotoProduk: [String],
  Harga: Number,
  Stok: Number
},{timestamps: true})

const Produk = mongoose.model('Produk',produkSchema);

module.exports = Produk;