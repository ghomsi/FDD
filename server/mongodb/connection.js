var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/fouilleDB')
.then(() =>  console.log('connection mongodb succesful'))
.catch((err) => console.error(err));;

module.exports = mongoose;

//Var
exports.indexName = 'fouilleDB';
