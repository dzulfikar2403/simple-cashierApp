const Pelanggan = require('../model/pelanggan');

const getData = async (req,res)=>{
  try {
    const findAll = await Pelanggan.find().exec();

    res.json(findAll)
  } catch (error) {
    res.json(error.message)
  }
};

const postData = async (req,res)=>{
  const {NamaPelanggan,Alamat,NomorTelepon} = req.body;
  
  try {
    if(!NamaPelanggan || !Alamat || !NomorTelepon){
      throw Error('field must be fill')
    }

    await Pelanggan.create({NamaPelanggan,Alamat,NomorTelepon});
    res.json('success post')
  } catch (error) {
    res.json(error.message)
  }
}

const updateData = async (req,res) => {
  const {NamaPelanggan,Alamat,NomorTelepon} = req.body;
  const {id} = req.params;

  try {
    const PelangganById = await Pelanggan.findOne().where('_id').equals(id).exec();
    if(!PelangganById){
      throw Error('ID not found!')
    }

    if(!NamaPelanggan || !Alamat || !NomorTelepon){
      throw Error('field must be fill')
    }
    
    const dataUpdate = {
      NamaPelanggan: NamaPelanggan || PelangganById.NamaPelanggan,
      Alamat: Alamat || PelangganById.Alamat,
      NomorTelepon: NomorTelepon || PelangganById.NomorTelepon
    }

    await Pelanggan.updateOne({_id: id},dataUpdate).exec();
    res.json('success update data');
  } catch (error) {
    res.json(error.message)
  }
}

const deleteData = async (req,res)=>{
  const {id} = req.params;

  try {
    const PelangganById = await Pelanggan.findOne().where('_id').equals(id).exec();
    if(!PelangganById){
      throw Error('ID not found')
    }

    await Pelanggan.deleteOne().where('_id').equals(id).exec();
    res.json('success deleted data : ' + PelangganById.NamaPelanggan)
  } catch (error) {
    res.json(error.message)
  }
}

module.exports = {getData,postData,updateData,deleteData}