const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const Offers = new Schema({
  offerTitle: String,
  offerDescription: String,
  offerPictureUrl: String
},
  {
    timestamps: true // Add two field automatically, createAt, updateAt
  });
const OffersModel= mongoose.model("Offers", Offers);
module.exports =OffersModel;
