const mongoose = require('mongoose');

const TestimonialSchema = new mongoose.Schema({
   review :  { type : String , required : true , unique : true },
   rating :  { type : number , required : true },
   doctorID : {type : mongoose.Types.ObjectId, required : true  , ref : 'Doctor' },
   PatientID : {type : mongoose.Types.ObjectId, required : true  , ref : 'Patient' }
});

module.exports = mongoose.model('Doctors' , TestimonialSchema);
