const mongoose = require('mongoose');
const uniqueValidator = require ('mongoose-unique-validator');

const doctorSchema = new mongoose.Schema({
   name :  { type : String , required : true  },
   email :  { type : String , required : true , unique : true },
   password :  { type : String , required : true , minlength : 5 },
});

doctorSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Doctors' , doctorSchema);
