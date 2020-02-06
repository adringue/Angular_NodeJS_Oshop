const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Room= new Schema({
  color: String,
  chairsNumber: Number
},
{
    timestamps: true // Add two field automatically, createAt, updateAt
  });
const RoomModel = mongoose.model("room", Room);
module.exports = RoomModel;
