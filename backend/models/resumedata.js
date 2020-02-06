const mongoose = require('mongoose');
const resumeDataSchema = mongoose.Schema({
  profileImagePath: { type: String }

});
// turning the above definition into a model
module.exports = mongoose.model('resumeData', resumeDataSchema);
