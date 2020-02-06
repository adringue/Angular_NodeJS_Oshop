const mongoose = require('mongoose');
const postSchema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  imagePath:{type:String},
  messageStatus: {type:String}
});
// turning the above definition into a model
module.exports = mongoose.model('Post', postSchema);
