const mongoose = require('mongoose');

const Doctor = require('./Models/doctor');

const connect = mongoose.connect('mongodb+srv://zulkifle:IYdwZvysD4H5Qyg2@cluster0.nidka.mongodb.net/TestDB?retryWrites=true&w=majority')
.then(() => {
    console.log('Connected to database successfully!');
}).catch((err) =>  {
    console.log(`Error Connecting to database! Error : ${err}`);
});


const createDoctor = async (req, res , next) =>{

    const createdDoctor = new Doctor({
        name : req.body.name,
        specification : req.body.specification
    });
    try{
        const result = await createdDoctor.save();
        res.json(result);
    }catch(error){
        return res.json({message : `Could not store data! ${error.message} `})
    }
}

const getDoctors = async(req , res , next) =>{
    try{
        const doctors = await Doctor.find().exec();
        res.json(doctors);
    }catch(err){
        console.log("Error Retrieving Data!");
    }
}

exports.createDoctor = createDoctor;
exports.getDoctors = getDoctors;
