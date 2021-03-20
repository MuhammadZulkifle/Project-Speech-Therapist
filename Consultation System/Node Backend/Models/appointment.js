const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
    appTime :  { type : dateTime , required : true  },
    doctorID : {type : mongoose.Types.ObjectId, required : true  , ref : 'Doctor' },
    PatientID : {type : mongoose.Types.ObjectId, required : true  , ref : 'Patient' }
});

module.exports = mongoose.model('Patient' , AppointmentSchema);
