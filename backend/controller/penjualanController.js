const Penjualan = require('../model/penjualan');
const Pelanggan = require('../model/pelanggan');
const Produk = require('../model/produk');

const getData = async(req,res) => {
  const findAll = await Penjualan.find().select('TanggalPenjualan TotalHarga PelangganID').exec();
  if(findAll.length === 0){
    res.json('data empty')
  }else{
    res.json(findAll)
  }
}

const getDataById = async(req,res) => {
  const {id} = req.params;

  try {
    const dataById = await Penjualan.findOne().where('_id').equals(id).populate('ProdukID PelangganID').exec();
    if(!dataById){
      throw Error('ID not found!')
    }
    
    res.json(dataById);
  } catch (error) {
    res.json(error.message)
  }
}

// const postData = async(req,res) => {
//   const {ProdukID,PelangganID,JumlahProduk} = req.body;

  
//   try {
//     if( !ProdukID || !PelangganID || !JumlahProduk ){
//       throw Error('all field must be fill !')
//     }
    
//     const findProductID = await Produk.findOne().where('_id').equals(ProdukID);
//     if (!findProductID) {
//         throw Error('ProdukID not found');
//     }
    
//     const findPelangganID = await Pelanggan.findOne().where('_id').equals(PelangganID).exec();
//     if(!findPelangganID){
//       throw Error('PelangganID not found')
//     }
    
//     const TotalHarga = await findProductID.Harga * JumlahProduk;
//     const decrementStok = findProductID.Stok - JumlahProduk;

//     await Penjualan.create({ProdukID,PelangganID,JumlahProduk,TotalHarga});
//     await Produk.updateOne({_id: ProdukID}, {Stok: decrementStok})
//     res.json('success post data!')
//   } catch (error) {
//     res.json(error.message)
//   }
// }


const deleteData = async(req,res) => {
  const {id} = req.params;

  try {
    const dataById = await Penjualan.findById(id).exec();
    if(!dataById){
      throw Error('ID not found!')
    }

    await Penjualan.deleteOne().where('_id').equals(id).exec();
    res.json('success delete data')
  } catch (error) {
    res.json(error.message)
  }
}

module.exports = {getData,getDataById,deleteData}