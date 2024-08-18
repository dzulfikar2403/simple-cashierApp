const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
  name: {type: String, required: true},  
  email: {type: String, required: true, unique: true},  
  password: {type: String, required: true},
  role: {type: Number, required: true}
},{timestamps: true})

const Users = mongoose.model("user",usersSchema);

module.exports = Users;