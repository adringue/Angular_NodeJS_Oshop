const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ordersModel=new Schema({
  orders: [],
  name: String
});

const Orders = mongoose.model("orders", ordersModel);
module.exports = Orders;
