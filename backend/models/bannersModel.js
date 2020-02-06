const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Banners = new Schema({
  url: String
},
{
    timestamps: true // Add two field automatically, createAt, updateAt
  });
const BannersModel = mongoose.model("Banners", Banners);
module.exports = BannersModel;
