const Users = require('../model/users');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const getDataUsers = async (req,res) => {
  const allData = await Users.find().select('-password');
  res.json(allData)
};

const registerPost = async (req,res) => {
  const {name,email,password,role} = req.body;

  try {
    if(!name || !email || !password || !role){
      throw Error('field must be fill or role must be identified!')
    }
    
    const checkEmail = await Users.findOne().where('email').equals(email);
    if(checkEmail){
      throw Error('email already used!')
    }
    
    if(!validator.isEmail(email)){
      throw Error('invalid typeof email!')
    }
    
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password,salt);
    
    await Users.create({name,email,password: passwordHash,role});
    res.json('success registering');
  } catch (error) {
    res.json(error.message)
  }
} 

const loginPost = async (req,res) => {
  const {email,password} = req.body;
  
  try {
    if(!email || !password){
      throw Error('field must be fill!')
    }

    if(!validator.isEmail(email)){
      throw Error('invalid typeof email!')
    }
    
    const checkEmail = await Users.findOne().where('email').equals(email);
    if(!checkEmail){
      throw Error('invalid email or password!')
    }

    const matchingPw = await bcrypt.compare(password,checkEmail.password);
    if(!matchingPw){
      throw Error('invalid email or password!')
    }
    
    const token = jwt.sign({ id: checkEmail._id, username: checkEmail.name, role: checkEmail.role },process.env.SECRET,{expiresIn: '1d'});
    res.json({token});
  } catch (error) {
    res.status(400).json(error.message)
  }
} 

const deleteUsers = async (req,res) => {
  const {id} = req.params;

  try {
    const checkMatching = await Users.findOne().where('_id').equals(id);
    if(!checkMatching){
      throw Error('invalid ID')
    }

    await Users.deleteOne().where('_id').equals(id)
    res.json('success')
  } catch (error) {
    res.json(error.message)
  }
}

module.exports = {getDataUsers,registerPost,loginPost,deleteUsers}