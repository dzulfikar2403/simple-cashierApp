const mongoose = require('mongoose');

const penjualanSchema = new mongoose.Schema({
  TanggalPenjualan: {type: Date, default: Date.now().toString()},
  ProdukID: [{type: mongoose.Schema.Types.ObjectId, ref: 'Produk'}],
  MemberID: {type: mongoose.Schema.Types.ObjectId, ref: 'Pelanggan'},
  JumlahProduk: [Number],
  TotalHarga: Number
},{timestamps: true});

const Penjualan = mongoose.model('Penjualan',penjualanSchema);

module.exports = Penjualan;