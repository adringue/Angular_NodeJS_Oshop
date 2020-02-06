const mongoose = require('mongoose');
const performanceSchema = mongoose.Schema({
  timeElapsed: { type: Number, required: true },
  numberOfMoves: { type: Number, required: true },
  rating:{type:String},
  email:{type:String}
});
// turning the above definition into a model
module.exports = mongoose.model('Performance', performanceSchema);
