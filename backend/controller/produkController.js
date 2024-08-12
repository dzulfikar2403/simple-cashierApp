const Produk = require("../model/produk");

const getData = async (req, res) => {
  const findAll = await Produk.find().select('-FotoProduk').exec();

  res.json(findAll)
};

const getDataById = async (req, res) => {
  const {id} = req.params;

  try {
    const dataById = await Produk.findOne().where('_id').equals(id).exec();
    if(!dataById){
      throw Error('ID not found!')
    }

    res.json(dataById);
  } catch (error) {
    res.json(error.message)
  }
};

const postData = async (req, res) => {
  const { NamaProduk, Harga, Stok } = req.body;
  const files = req.files;
  
  const fotoArr = files.map(el => el.filename);

  try {
    if(req.fileValidationErr){
      throw Error(req.fileValidationErr)
    }

    if (!NamaProduk || !Harga || !Stok || files.length === 0) {
      throw Error("field must be fill");
    }

    await Produk.create({ NamaProduk, Thumbnail: fotoArr[0], FotoProduk: fotoArr, Harga, Stok });
    res.json('success');
  } catch (error) {
    res.json(error.message);
  }
};


const updateData = async (req,res) => {
  const { NamaProduk, Harga, Stok } = req.body;
  const {id} = req.params;
  console.log(req.body);
  console.log(id);
  
  try {
    const produkById = await Produk.findOne().where('_id').equals(id).exec();
    if(!produkById){
      throw Error('ID not found!')
    }

    if (!NamaProduk || !Harga || !Stok) {
      throw Error("field must be fill");
    }

    const dataUpdate = {
      NamaProduk: NamaProduk,
      Thumbnail: produkById.Thumbnail,
      FotoProduk: produkById.FotoProduk,
      Harga: Harga,
      Stok: Stok,
    }
    
    await Produk.updateOne({_id: id},dataUpdate);
    res.json('success')
  } catch (error) {
    res.json(error.message)
  }
}

const deleteData = async(req,res)=>{
  const {id} = req.params;

  try {
    await Produk.deleteOne().where('_id').equals(id).exec();
    res.json('success delete data')
  } catch (error) {
    res.json(error.message)
  }
}

module.exports = { getData, getDataById, postData, updateData, deleteData };
