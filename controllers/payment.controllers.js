require('dotenv').config()
const Joi = require('joi')
const { v4: uuidv4 } = require('uuid')
const msgClass = require('../errors/error')
const paymentService = require('../services/payment.services')
const paymentModel = require('../models/payment.models')


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

 const createNewSubscription = async (req, res) => {
    const { customer, plan } = req.body

    const subscriptionSchema = Joi.object({
        customer: Joi.string().email().required(),
        plan: Joi.string().required(),
     })

     try{
        const subscriptionValidation = subscriptionSchema.validate(req.body)  
        if (subscriptionValidation.error) {
            throw new Error("Provide correct details")
        }
        const confirmSubscription  = await paymentService.createSubscription(req.body)
        if (confirmSubscription.data.status != true) {
            throw new Error("Kindy confirm customer/plan details")
             
         }
     }
     catch(err){
         
        res.status(400).send({
            status: false,
            message:   err.message

     })
     }

}

const listNewSubscription = async (req, res) => {
    const perPage = req.query.perPage || 50
    const page = req.query.page || 1

    try {
 
        const listSubscriptionPerPageAndPage = await paymentService.listSubscription(perPage,page)
        if (listSubscriptionPerPageAndPage.status == true) {
            throw new Error("Subscription page cannot be retrieved")
        }
        
        res.status(200).send({
            status: true,
            message: "Page retrieved successfully",
            data: listSubscriptionPerPageAndPage.status
        })
    } 
    catch(err) {
       // console.log(`error: ${e.message}`)
        res.status(400).send({
            status: false,
            message:   err.message || msgClass.GeneralError

     })
    }

}

const fetchNewSubscription = async (req, res) => {
 
    const {id_or_code} = req.params

    try {

        const confirmSubscriptionsFetched = await paymentService.fetchSubscription(id_or_code)
        if (confirmSubscriptionsFetched.data.status != true) {
            throw new Error(msgClass.ConsumerError)
        }
        
        res.status(200).send({
            status: true,
            message: "Subscriptions retrieved"
        })
    } 
    catch(err) {
        res.status(400).send({
            status: false,
            message:   err.message || msgClass.ConsumerError

     })
    }

}
 


module.exports = {
    createTransaction,
    verifyTransaction,
    listNewSubscription,
    fetchNewSubscription
}