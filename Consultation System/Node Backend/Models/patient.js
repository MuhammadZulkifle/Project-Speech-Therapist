//const { Int32 } = require('mongodb');
const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
   name :  { type : String , required : true  },
   // lname :  { type : String },
    email :  { type : String , required : true  },
    password :  { type : String , required : true  },
   // cnic :  { type : String , required : true  },
   //address :  { type : String , required : true  },
   payments : [{type : mongoose.Types.ObjectId, required : true  , ref : 'Payment' }]
});

module.exports = mongoose.model('Patient' , patientSchema);
