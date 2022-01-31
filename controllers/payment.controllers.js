require('dotenv').config()
const Joi = require('joi')
const { v4: uuidv4 } = require('uuid')
const msgClass = require('../errors/error')
const paymentService = require('../services/payment.services')
const paymentModel = require('../models/payment.models')


const createTransaction = async (req, res) => {


    const { amount, paymentOptionType, email, phone, fullname, customer_id } = req.body
    
    const paymentSchema = Joi.object({
        fullname: Joi.string().required(),
        email: Joi.string().email().required(),
        phone: Joi.string(), //length(11).pattern(/^[0-9]+$/),
        amount: Joi.string().required(),
        customer_id: Joi.string().required(),
        paymentOptionType: Joi.string().valid('card','banktransfer','ussd').required()
    })

    const responseFromJoiValidation = paymentSchema.validate(req.body)
    if (responseFromJoiValidation.error) {
        res.status(422).send({
            status: false,
            message: msgClass.BadRequest,
            data: []
        })
    }

    try {
        const paymentInitializationResponse =  await paymentService.initalizePayment(req.body)
        if (paymentInitializationResponse.data.status != "success") {
           throw new Error("Sorry , payment cannot be initialise this moment")
            
        }
        //initiate on our db
        await paymentModel.createNewTransaction(customer_id, data.amount, data.payment_channel, data.payment_status, data.transaction_reference, data.transaction_date)

        res.status(200).send({
            status: true,
            message: msgClass.CustomerCreated,
            data: []
        })
    } 
    catch (err) {
        console.log(`error: ${err.message}`)
        res.status(200).send({
            status: false,
            message:   err.message || msgClass.GeneralError

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

module.exports = {
    createTransaction
}