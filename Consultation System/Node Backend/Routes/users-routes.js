const express = require('express');
const {check} = require('express-validator');

const userController = require('../Controllers/userController');

const paymentController = require('../Controllers/paymentController');
// const MongoCollection = require('../mongoose');

const router = express.Router();

router.post('/setPatient' , userController.setPatient);

router.post('/addPayment' , paymentController.addPayment);

router.get('/getPatients' , userController.getPatients);

router.get('/getPatientByID/:pid' , userController.getPatientByID);

router.get('/getPaymentByUserID/:pid' , paymentController.getPaymentByUserId);

router.get('/getPatientByName/:name' , userController.getPatientByName);

router.patch('/updatePatientByID/:tid' , userController.updatePatientByID);

router.delete('/deletePatientById/:did' , userController.deletePatientById);

router.delete('/deletePaymentById/:pid' , paymentController.deletePaymentById);

router.post('/signup' , userController.signup);

router.post('/login', userController.login);

router.get('/getUsers' , userController.getUsers);

// router.post('/setDoctor' , MongoCollection.createDoctor);
// router.get('/getDoctors' , MongoCollection.getDoctors);


router.get('/:uid', userController.getUserByID );

router.post('/', [check('name').not().isEmpty() , check('fname').isLength({min : 5}) ] , userController.addUser );

router.patch('/:uid' , userController.updateByID);

router.delete('/:uid' , userController.deleteById);


module.exports = router;