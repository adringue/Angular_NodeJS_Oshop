const mongoose = require('mongoose');
const Schema = mongoose.Schema;




// const Banners = new Schema({
//   url: String
// });

// const Offers = new Schema({
//   offerTitle: String,
//   offerDescription: String,
//   offerPictureUrl: String
// });

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
  banner:{
    type:[],
    require:true,

    },
  offers: {
    type:[],
    require: false,

  },
  description: {
    type: String,
    require: false
  },
  price: {
    type: Number,
    require: false
  }
},
  {
    timestamps: true // Add two field automatically, createAt, updateAt
  });
const Item = mongoose.model("items", itemModel);
module.exports = Item;
