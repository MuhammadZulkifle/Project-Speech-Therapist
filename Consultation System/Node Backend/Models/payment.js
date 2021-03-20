const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
   amount :  { type : String , required : true  },
   paymentMethod : { type : String , required : true},
   date :  { type : String , required : true  },
   patientID : {type : mongoose.Types.ObjectId, required : true  , ref : 'Patient' }
});

module.exports = mongoose.model('Payment' , patientSchema);
