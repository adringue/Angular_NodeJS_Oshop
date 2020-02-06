const mongoose = require('mongoose');
// const Item = require('./itemModel');
const Schema = mongoose.Schema;



// let shoppingCart=[];
// let shoppingCartItem=[];

const Banners = new Schema({
  url: String
});

const Offers = new Schema({
  offerTitle: String,
  offerDescription: String,
  offerPictureUrl: String
});

const itemModel = new Schema({
  categoryId: {
    type: String,
    require: true
  },
  category: {
    type: String,
    require: true
  },

  name: {
    type: String,
    require: true,
    unique: true
  },
  banner: {
    type: [Banners],
    require: true
  },
  offers: {
    type: [Offers],
    require: false
  },
  description: {
    type: String,
    require: false
  },
  price: {
    type: Number,
    require: false
  }
}
);

 const shoppingCartItem = new Schema({
  myshoppingcart: {
    type: String,
    require: true
  },
  product: {
    type: itemModel,
    require: true
  },
  quantity: {
    type: Number,
    require: true
  },

},
  {
    timestamps: true // Add two field automatically, createAt, updateAt
  }

);



const ShoppingCartItemModel = mongoose.model("shoppingCartItem", shoppingCartItem);
module.exports =  ShoppingCartItemModel;
