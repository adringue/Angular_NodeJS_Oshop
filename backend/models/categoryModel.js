const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const categoryModel = new Schema({
  name: {
    type: String,
    require: true,
    unique: true
  },
  banner: {
    type: String,
    require: false
  },
  description: {
    type: String,
    require: false
  }
},
  {
    timestamps: true // Add two field automatically, createAt, updateAt
  });
const Category = mongoose.model("category", categoryModel);
module.exports = Category;
