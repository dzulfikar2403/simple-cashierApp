const Penjualan = require("../model/penjualan");
const Pelanggan = require("../model/pelanggan");
const Produk = require("../model/produk");

const getData = async (req, res) => {
  const findAll = await Penjualan.find().select("TanggalPenjualan TotalHarga MemberID");
  res.json(findAll);
};

const getDataById = async (req, res) => {
  const { id } = req.params;

  try {
    const dataById = await Penjualan.findOne().where("_id").equals(id).populate("ProdukID MemberID");
    if (!dataById) {
      throw Error("ID not found!");
    }

    res.json(dataById);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const postData = async (req, res) => {
  const { ProdukID, MemberID, JumlahProduk } = req.body;
  
  try {
    if (!Array.isArray(ProdukID) || !Array.isArray(JumlahProduk)) {
      throw Error("all field must be fill !");
    }

    if (ProdukID.length !== JumlahProduk.length) {
      throw Error("produkID length must be same with jumlahProduk length");
    }

    // tinggal fix optional memberID
    if (MemberID) {
      const findMemberID = await Pelanggan.findOne().where("_id").equals(MemberID);
      if (!findMemberID) {
        throw Error("MemberID not found");
      }
    }

    let TotalHarga = 0;
    for (let i = 0; i < ProdukID.length; i++) {
      const findProductID = await Produk.findOne().where("_id").equals(ProdukID[i]);
      if (!findProductID) {
        throw Error(`ProdukID ${ProdukID[i]} not found`);
      }

      const alreadyStok = findProductID.Stok - JumlahProduk[i];
      if (alreadyStok < 0) {
        throw Error(`stok not available for ProdukID: ${ProdukID[i]}!`);
      }

      TotalHarga += findProductID.Harga * JumlahProduk[i];

      await Produk.updateOne({ _id: ProdukID[i] }, { Stok: alreadyStok });
    }

    await Penjualan.create({ ProdukID, MemberID, JumlahProduk, TotalHarga });
    res.json("success post data!");
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const deleteData = async (req, res) => {
  const { id } = req.params;

  try {
    const dataById = await Penjualan.findById(id).exec();
    if (!dataById) {
      throw Error("ID not found!");
    }

    await Penjualan.deleteOne().where("_id").equals(id).exec();
    res.json("success delete data");
  } catch (error) {
    res.json(error.message);
  }
};

module.exports = { getData, postData, getDataById, deleteData };
