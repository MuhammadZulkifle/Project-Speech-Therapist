const mongoose = require('mongoose');
const {validationResult} = require('express-validator');
const  uuid  = require('uuid');


const httpError = require('../Models/http-error');
const Patient = require('../Models/patient');

const User = require('../Models/user');

const patient = require('../Models/patient');

const Doctor = require('../Models/doctor');


const connect = mongoose.connect('mongodb+srv://zulkifle:IYdwZvysD4H5Qyg2@cluster0.nidka.mongodb.net/TestDB?retryWrites=true&w=majority')
.then(()=>{console.log("Connected To database Successfully!")})
.catch((err)=>{console.log(`Error Connecting to database ${err}`)} );



let Dummy_Users =[ {
    id : 'u1',
    name : 'Muhammad Zulkifle Maroof',
    fName : "Muhammad Maroof",
    university : "Comsats University Islamabad",
    address : {
        lon : 123213,
        lat : 2312312
    }
}];


const setPatient = async(req , res, next) =>{
    const createdPatient = new Patient ({
        name : req.body.name,
        address : req.body.address
    });
    try{
    const result = await createdPatient.save();
    res.json(result);
    }catch(err){
        const error = new httpError('Error Creating Patient' , 500 );
        return next(error);
    }
}

const signup = async (req, res , next) =>{
    console.log("Get Request in signup");
    const errors  = validationResult(req);
    if(!errors.isEmpty()){
        const error =  new httpError('Invalid Inputs passed , please try again with correct data' , 422 );
        return next(error);
    }
    const {name , email, password, role } = req.body;
    console.log(`name is ${name}` );

    let existingUser;
    try{
        existingUser = await User.findOne({ email : email });
    }catch(err){
        const error = new httpError('Signing Up failed, Try again later ! ' , 500 ) ;
        return next(error);
    }

    if (existingUser){
        const error = new httpError('User already exists ' , 422);
        return next(error);
    }

    const createdUser = new User({
        name,
        email,
        password,
        role,
    //    payments : [],
    });
    console.log(createdUser);

    try{
        await createdUser.save();
    }catch(message){
        const error = new httpError(`Signing up failed!` , 500);
        console.log(message);
        return next(error);
    }

    res.status(201).json({User : createdUser.toObject({getters: true })});

}


const login = async (req, res , next) =>{
    const {email, password } = req.body;

    let existingUser;
    try{
        existingUser = await Patient.findOne({ email : email });
    }catch(err){
        const error = new httpError('Signing Up failed,  Try again later ! ' , 500 ) ;
        return next(error);
    }

    if(!existingUser || password !== existingUser.password ){
        const error = new httpError('Login Failed. Invalid Credentials ! ' , 401 ) ;
        return next(error);
    }
    res.json({message: 'Logged in successfully ! '});
}


const getPatients = async(req, res , next)=>{
    try{
        const patients = await Patient.find().exec();
        res.json(patients);
    }catch(err){
        const error = new httpError('Error Getting Patients' , 201);
        return next(error);
    }
}
const getPatientByID = async (req, res, next) =>{
    const patientId = req.params.pid;
    console.log(`Req Id is ${patientId}`);
    let patient;
    try{
        patient = await Patient.findById(patientId);
        console.log(`Patient is : ${patient} `);
    }catch(err){
        const error = new httpError('Something went wrong.' , 500 );
        return next(error);
    }
    if(!patient){
         return next(new httpError(`Could Not find a user with id ${patientId} ` , 404));
    }
    res.json({patient : patient.toObject({getters : true})});
};

const getPatientByName = async (req, res, next) =>{
    const patientName = req.params.name;
    console.log(`Req name is ${patientName}`);
    let patient;
    try{
        patient = await Patient.find({name : patientName});
        console.log(`Patient is : ${patient} `);
    }catch(err){
        const error = new httpError('Something went wrong.' , 500 );
        return next(error);
    }
    if(!patient){
         return next(new httpError(`Could Not find a user with name ${patientName} ` , 404));
    }
    res.json({patient : patient.map(p => p.toObject()) });
};

const getUsers = async (req , res , next ) =>{
    let users;
    try{
        users = await Doctor.find({} , '-password');
    }catch{
        const error = new httpError('Could not get the users ' , 500 );
    }
    res.json(users.map(user => user.toObject({getters : true })));
}

const updatePatientByID = async (req , res , next) =>{
    console.log("Update Request received");
    const {name , address } = req.body;
    //const PatientId = req.params.uId;
    // console.log(patientId);
    console.log(`Patient ID ${req.params.tid}`);
    let patient;
    const id = req.params.tid;
    console.log(id);
    try{
        patient = await Patient.findById(req.params.tid);
        console.log(`Patient :  ${patient.toObject()} `);
    }catch(err){
        return next(new httpError(`Could not find user ` , 500));
    }
    patient.name = name;
    patient.address = address;
    let updatedPatient;
    try{
        updatedPatient =  await patient.save();
    }catch(err){
        return next(new httpError('Error updating patient' + err.message))
    }
    res.status(200).json({updatedPatient : updatedPatient.toObject()});
    }
    const deletePatientById = async (req , res , next)=>{
        id = req.params.did;
        let patient;
        try{
             patient = await Patient.findById(id);
        }catch{
            return next(new httpError('Something went wrong! Could not delete') , 500);
        }
        try{
            patient.remove();
        }catch{
            return next(new httpError('Something went wrong! Could not delete') , 500);
        }
        res.status(200).json({message : "User Deleted Successfully"});
    }


const getUserByID = (req, res, next) =>{
    const userId = req.params.uid;
    const users = Dummy_Users.find(p =>{
        return p.id === userId
    })
    console.log("Get Request in users route");
    if(!users){
         return next(new httpError(`Could Not find a user with id ${userId} ` , 404));
    }
    res.json({users});
};

const addUser = (req , res , next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        throw new httpError('Validation Errors Occur.' , 422)
    }
    const {name , fname , university ,  address } = req.body;
    const createdUser = {
        id : uuid.v1(),
        name ,
        fname,
        university,
        address : address
    }
    Dummy_Users.push(createdUser);

    res.status(201).json({place : createdUser})

};

const updateByID = (req , res , next) =>{
console.log("Update Request received");
const {name , fname } = req.body;
const userId = req.params.uid;
const updatedUsers = {...Dummy_Users.find(p => p.id = userId)}
const updatedIndex = Dummy_Users.findIndex(p => p.id = userId)
console.log(`Updated ${updatedUsers.address} index : ${updatedIndex} `  );
updatedUsers.name = name;
updatedUsers.fName = fname;
Dummy_Users[updatedIndex] = updatedUsers;

res.status(200).json({updatedUser : updatedUsers});
}

const deleteById = (req , res , next)=>{
    deletedId = req.params.uid;
    Dummy_Users = Dummy_Users.filter(u => u.id != deletedId );
    res.status(200).json({message : "User Deleted Successfully"});

}

exports.getUserByID = getUserByID;
exports.addUser = addUser;
exports.signup = signup;
exports.login = login;
exports.updateByID = updateByID;
exports.deleteById = deleteById;
exports.setPatient = setPatient;
exports.getPatients = getPatients;
exports.getPatientByID = getPatientByID;
exports.getPatientByName = getPatientByName;
exports.getUsers = getUsers;
exports.updatePatientByID = updatePatientByID;
exports.deletePatientById = deletePatientById;