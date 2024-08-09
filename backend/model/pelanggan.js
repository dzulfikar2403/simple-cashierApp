const mongoose = require('mongoose');

const pelangganSchema = new mongoose.Schema({
  NamaPelanggan: {type: String, require: true},
  Alamat: {type: String, require: true},
  NomorTelepon: {type: String, require: true}
},{timestamps: true});

const Pelanggan = mongoose.model('Pelanggan',pelangganSchema);

module.exports = Pelanggan;