const mongoose = require('mongoose');
const {validationResult} = require('express-validator');
const  uuid  = require('uuid');


const httpError = require('../Models/http-error');
const Patient = require('../Models/patient');
const Payment = require('../Models/payment');


const addPayment = async (req, res , next) => {
    const errors  = validationResult(req);
    if(!errors.isEmpty()){
        const error =  new httpError('Invalid Inputs passed , please try again with correct data' , 422 );
        return next(error);
    }

    const {amount , paymentMethod , date , patientID} = req.body ;

    console.log(`Patient Id ${patientID} ` );

    const payment = new Payment({
    amount,
    paymentMethod,
    date,
    patientID
    });
    let patient;
    try{
        patient = await Patient.findById(patientID);
    }catch{
        const error = new httpError('Adding payment failed . Try again');
        return next(error);
    }
    if(!patient){
        const error = new httpError('Could not find patient with this id!');
        return next(error);
    }
    try{
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await payment.save({ session: sess });
    patient.payments.push(payment);
    await patient.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    console.log(err.message);
    const error = new httpError(
      'Adding payment failed, please try again.',
      500
    );
    return next(error);
  }
  res.status(201).json({ payment : payment });
}

const getPaymentByUserId = async(req, res, next) => {
    const userId = req.params.pid;
    //console.log(`Req Id is ${patientId}`);
    let userWithPayment;
    try{
        //patient = await Patient.findById(patientId);
        userWithPayment = await Patient.findById(userId).populate('payments')  ;
        //console.log(`Patient is : ${patient} `);
    }catch(err){
        console.log(err.message);
        const error = new httpError('Something went wrong.' , 500 );
        return next(error);
    }
    if(!userWithPayment || userWithPayment.payments.length === 0 ){
         return next(new httpError(`Could Not find a payment with id ${userId} ` , 404));
    }
    res.json({payments : userWithPayment.payments.map(payment =>
    payment.toObject({getters : true}))
    });
}

const deletePaymentById = async (req , res , next)=>{
    const paymentId = req.params.pid;
    let payment;
    try{
         payment = await Payment.findById(paymentId).populate('patientID');
    }catch(err){
        console.log(err);
        return next(new httpError('Something went wrong! Could not delete') , 500);
    }

    if (!payment) {
        const error = new HttpError('Could not find payment for this id.', 404);
        return next(error);
      }
      console.log(`Payment is ${payment}`);
    try{
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await payment.remove({ session: sess });
        console.log(payment);
        console.log(payment.patientID);
        payment.patientID.payments.pull(payment);
        await payment.patientID.save({ session: sess });
        await sess.commitTransaction();
    }catch(err){
        console.log(err);
        return next(new httpError('Something went wrong! Could not delete') , 500);
    }
    res.status(200).json({message : "Payment Deleted Successfully"});
}

exports.addPayment = addPayment;
exports.getPaymentByUserId = getPaymentByUserId;
exports.deletePaymentById = deletePaymentById;