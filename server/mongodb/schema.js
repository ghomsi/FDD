var mongoose = require('./connection.js');
exports.mongoose = mongoose;


// Schema données
var donneeBayesSchema = new mongoose.Schema({
  outlook: String,
  temp: String,
  humidity: String,
  windy: Boolean,
  play: Boolean,
});
exports.donneesText = mongoose.model('donneesBayestext', donneeBayesSchema);

var donneeBayesNumSchema = new mongoose.Schema({
  outlook: String,
  temp: Number,
  humidity: Number,
  windy: Boolean,
  play: Boolean,
});
exports.donneesMix = mongoose.model('donneesBayesMix', donneeBayesNumSchema);
