const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const shippingOj = new Schema({
  name: String,
  address: String,
  address2: String,
  city: String
});

const itemObj = new Schema({
  name: String,
  imageUrl: String,
  price: Number
});


const orderModel = new Schema({
  userId: String,
  datePlace: Number,
  shipping: shippingOj,
  items: [{
    product: itemObj, quantity: Number,
    totalPrice: Number
  }]
});

const Ordr = mongoose.model("order", orderModel);
module.exports = Ordr;
