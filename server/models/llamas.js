var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Llama = new Schema({
  name: String,
  age: Number,
  spitter: Boolean
});

mongoose.connect(process.env.MONGO_URI);
module.exports = mongoose.model("llamas",Llama);
