require('dotenv').config()
const Joi = require('joi')
const { v4: uuidv4 } = require('uuid')
const msgClass = require('../errors/error')
const paymentService = require('../services/payment.services')
const paymentModel = require('../models/payment.models')

const acceptPin = responseOnCharge()
const createTransaction = async (req, res) => {


   // const { amount, paymentOptionType, email, phone, fullname, customer_id } = req.body
    const { amount, email } = req.body
    
    const paymentSchema = Joi.object({
       // fullname: Joi.string().required(),
        email: Joi.string().email().required(),
       // phone: Joi.string(), //length(11).pattern(/^[0-9]+$/),
        amount: Joi.string().required(),
       // customer_id: Joi.string().required(),
       // paymentOptionType: Joi.string().valid('card','banktransfer','ussd').required()
    })
    try {
    const responseFromJoiValidation = paymentSchema.validate(req.body)
        if (responseFromJoiValidation.error) {
            throw new Error("Bad request")
        }
        const paymentInitializationResponse = await paymentService.initalizePayment(req.body)
        
        console.log("Got back from paysatck: ", JSON.stringify(paymentInitializationResponse.data))
        if (paymentInitializationResponse.data.status == false) {
           throw new Error("Sorry, payment cannot be initialise this moment")
            
        }
        //initiate on our db
       // await paymentModel.createNewTransaction(customer_id, data.amount, data.payment_channel, data.payment_status, , data.transaction_date)

        res.status(200).send({
            status: true,
            message: "Transaction successfully initiated",
            data: paymentInitializationResponse.data.data
        })
    } 
    catch(e) {
       // console.log(`error: ${e.message}`)
        res.status(400).send({
            status: false,
            message:   e.message || msgClass.GeneralError

     })
    }
    
    
    
    

    // usersModel.newUser(email, firstname, surname, password, phone, customer_id)
    // .then(userResult => {
    //     console.log(userResult)
    //     const otp = generateOTP()
 
    //     return smsServices.sendSMS(phone, `Hello, your otp is ${otp}`)
    // })
    // .then(otpResult => {
    //     //console.log('i sent the otpp with response: ', (otpResult))
    //     res.status(200).send({
    //         status: true,
    //         message: `${msgClass.CustomerCreated}. ${msgClass.OtpSentSuccessfully}`,
    //         data: []
    //     })
    //  })
    //     .catch(err => {
    //        //console.log(err)
    //     res.status(200).send({
    //         status: false,
    //         message: "Kindly try again later , This is on us",
    //         response: []
    //      })
    // })

}


const verifyTransaction = async (req, res) => {


    // const { amount, paymentOptionType, email, phone, fullname, customer_id } = req.body
     const { payment_ref } = req.params
    
     try {
 
         const paymentVerificationResponse = await paymentService.verifyPayment(payment_ref)
         if (paymentVerificationResponse.data.data.status != "success") {
             throw new Error("We could not verify the amount paid. Kindly contact support")
         }
         
         res.status(200).send({
             status: true,
             message: "Transaction successfully initiated",
             data: paymentVerificationResponse.data.data
         })
     } 
     catch(e) {
        // console.log(`error: ${e.message}`)
         res.status(400).send({
             status: false,
             message:   e.message || msgClass.GeneralError
 
      })
     }
     
     
     
     
 
     // usersModel.newUser(email, firstname, surname, password, phone, customer_id)
     // .then(userResult => {
     //     console.log(userResult)
     //     const otp = generateOTP()
  
     //     return smsServices.sendSMS(phone, `Hello, your otp is ${otp}`)
     // })
     // .then(otpResult => {
     //     //console.log('i sent the otpp with response: ', (otpResult))
     //     res.status(200).send({
     //         status: true,
     //         message: `${msgClass.CustomerCreated}. ${msgClass.OtpSentSuccessfully}`,
     //         data: []
     //     })
     //  })
     //     .catch(err => {
     //        //console.log(err)
     //     res.status(200).send({
     //         status: false,
     //         message: "Kindly try again later , This is on us",
     //         response: []
     //      })
     // })
 
 }

 const chargeTransaction = async (req, res) => {

    
        // const { amount, paymentOptionType, email, phone, fullname, customer_id } = req.body
         const {email, amount, bank, dob } = req.body
         
         const paymentSchema = Joi.object({
            //  email: Joi.string().email().required(),
            //  amount: Joi.string().required(),
            //  bank: Joi.string().required(),
            //  dob: Joi.string().required()
            
         })
         try {
         const responseFromJoiValidation = paymentSchema.validate(req.body)
             if (responseFromJoiValidation.error) {
                 throw new Error("Bad request")
             }
             const responseOnCharge = await paymentService.chargeTransaction(req.body)
             
             
             if (responseOnCharge.data.status == false) {
                throw new Error("Sorry, payment cannot be initialise this moment, Please check the information provided")
                 
             }
             //initiate on our db
            // await paymentModel.createNewTransaction(customer_id, data.amount, data.payment_channel, data.payment_status, , data.transaction_date)
     
             res.status(200).send({
                 status: true,
                 message: "To confirm that you own this account, kindly enter the OTP sent to your phone",
                 data: responseOnCharge.data.data
             })
         } 
         catch(error) {
            // console.log(`error: ${e.message}`)
             res.status(400).send({
                 status: false,
                 message:   error.message || msgClass.GeneralError
     
          })
        }    
     }        
  
const submitPin = async (req, res) => {


    // const { amount, paymentOptionType, email, phone, fullname, customer_id } = req.body
     const { pin } = req.body
     
     const paymentSchema = Joi.object({
        // fullname: Joi.string().required(),
         pin: Joi.string().required,
        // phone: Joi.string(), //length(11).pattern(/^[0-9]+$/),
         // amount: Joi.string().required(),
        // customer_id: Joi.string().required(),
        // paymentOptionType: Joi.string().valid('card','banktransfer','ussd').required()
     })
     try {
     const responseFromJoiValidation = paymentSchema.validate(req.body)
         if (responseFromJoiValidation.error) {
             throw new Error("Bad request")
         }
         const pinResponse = await acceptPin.data.data.reference
         
         
         if (pinResponse.data.status == false) {
            throw new Error("Sorry, Invalid pin")
             
         }
         //initiate on our db
        // await paymentModel.createNewTransaction(customer_id, data.amount, data.payment_channel, data.payment_status, , data.transaction_date)
 
         res.status(200).send({
             status: true,
             message: "Transaction successfully initiated",
             data: acceptPin.data.data
         })
     } 
     catch(error) {
        // console.log(`error: ${e.message}`)
         res.status(400).send({
             status: false,
             message:   error.message || msgClass.GeneralError
 
      })
     }
     
 
 }

 const submitOtp = async (req, res) => {


    // const { amount, paymentOptionType, email, phone, fullname, customer_id } = req.body
     const otp  = req.body.otp
     
     const paymentSchema = Joi.object({
        // fullname: Joi.string().required(),
         otp: Joi.number().required,
        // phone: Joi.string(), //length(11).pattern(/^[0-9]+$/),
         // amount: Joi.string().required(),
        // customer_id: Joi.string().required(),
        // paymentOptionType: Joi.string().valid('card','banktransfer','ussd').required()
     })
     try {
     const responseFromJoiValidation = paymentSchema.validate(req.body)
         if (responseFromJoiValidation.error) {
             throw new Error("Bad request")
         }
         const otpResponse = await acceptPin.data.data.reference
         
         
         if (otpResponse.data.status == false) {
            throw new Error("Sorry, Invalid otp")
             
         }
         //initiate on our db
        // await paymentModel.createNewTransaction(customer_id, data.amount, data.payment_channel, data.payment_status, , data.transaction_date)
 
         res.status(200).send({
             status: true,
             message: "Transaction successfully initiated",
             data: acceptPin.data.data
         })
     } 
     catch(error) {
        // console.log(`error: ${e.message}`)
         res.status(400).send({
             status: false,
             message:   error.message || msgClass.GeneralError
 
      })
     }
       
   
     
 }

 const submitPhone = async (req, res) => {


    // const { amount, paymentOptionType, email, phone, fullname, customer_id } = req.body
     const phone  = req.body.phone
     
     const paymentSchema = Joi.object({
        // fullname: Joi.string().required(),
         phone: Joi.string(), //length(11).pattern(/^[0-9]+$/),
         // amount: Joi.string().required(),
        // customer_id: Joi.string().required(),
        // paymentOptionType: Joi.string().valid('card','banktransfer','ussd').required()
     })
     try {
     const responseFromJoiValidation = paymentSchema.validate(req.body)
         if (responseFromJoiValidation.error) {
             throw new Error("Bad request")
         }
         const phoneResponse = await acceptPin.data.data.reference
         
         
         if (phoneResponse.data.status == false) {
            throw new Error("Sorry, something went wrong")
             
         }
         //initiate on our db
        // await paymentModel.createNewTransaction(customer_id, data.amount, data.payment_channel, data.payment_status, , data.transaction_date)
 
         res.status(200).send({
             status: true,
             message: "Transaction successfully initiated",
             data: acceptPin.data.data
         })
     } 
     catch(error) {
        // console.log(`error: ${e.message}`)
         res.status(400).send({
             status: false,
             message:   error.message || msgClass.GeneralError
 
      })
     }
       
   
     
 }
 const checkPendingCharge = async (req, res) => {


    // const { amount, paymentOptionType, email, phone, fullname, customer_id } = req.body
     const { reference } = req.params
    
     try {
 
         const pendingCharge = await paymentService.checkPendingCharge(reference)
         if (pendingCharge.data.data.status = "false") {
             throw new Error("Invalid Transaction reference")
         }
         
         res.status(200).send({
             status: true,
             message: "successfully",
             data: pendingCharge.data.data
         })
     } 
     catch(e) {
        // console.log(`error: ${e.message}`)
         res.status(400).send({
             status: false,
             message:   e.message || msgClass.GeneralError
 
      })
     }
     
 
 }
 

module.exports = {
    createTransaction,
    verifyTransaction,
    chargeTransaction,
    submitPin,
    submitOtp,
    submitPhone,
    checkPendingCharge
}