require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const pelangganRoute = require('./router/pelanggan');
const produkRoute = require('./router/produk');
const penjualanRoute = require('./router/penjualan');
const usersRoute = require('./router/users');

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//connect mongodb
mongoose
  .connect("mongodb://127.0.0.1/apk-kasir")
  .then(() => console.log("mongodb succes connected"))
  .catch((err) => console.log(`errcon : ${err}`));

//APIs
app.get("/", (req, res) => {
  res.json("sucess connect");
});

app.use('/produk',produkRoute)
app.use('/pelanggan',pelangganRoute)
app.use('/penjualan',penjualanRoute)
app.use('/users',usersRoute)

app.listen(process.env.PORT, () => {
  console.log(`server running at ${process.env.PORT}`);
});
