const mongoose = require('mongoose');

const CallingSchema = new mongoose.Schema({
    startTime :  { type : dateTime , required : true  },
    eneTime :  { type : dateTime , required : true  },
    duration :  { type : number , required : true  },
    userID : {type : mongoose.Types.ObjectId, required : true  , ref : 'User' }
});

module.exports = mongoose.model('Calling' , CallingSchema);
