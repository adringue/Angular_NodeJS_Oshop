const mongoose = require('mongoose');
const resumeVisitorDataSchema = mongoose.Schema({
  visitorEmail:{type: String},
  visitDate: {type: Date}
});
// turning the above definition into a model
module.exports = mongoose.model('resumeVisitorData', resumeVisitorDataSchema);
