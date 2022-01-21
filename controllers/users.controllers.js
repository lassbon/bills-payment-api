require('dotenv').config()
const { v4: uuidv4 } = require('uuid')
const Joi = require('Joi')
const smsServices = require('../services/sms.services')
const usersModel = require('../models/users.models')
const errorClass = require('../errors/error')


const error = []

const generateOTP = ()=>{

    return Math.floor(Math.random() * 10000)
}




const getUser = (req, res) => {
   
    const { customer } = req.params
    
        usersModel.
        res.status(200).send({
            status: true,
            message: errorClass.CustomerDetailsFetched,
            data: userDetails || []
        })
    
}

const createNewUser = async (req, res) => {

    const userSchema = Joi.object({
        firstname: Joi.string().required(),
        surname: Joi.string().required(),
        email: Joi.string().email().required(),
        phone: Joi.string(), //length(11).pattern(/^[0-9]+$/),
        password: Joi.string().alphanum().required(),
    })

    const validateUser = userSchema.validate(req.body)
    if (validateUser.error) {
        res.status(422).send({
            status: false,
            message: "Bad Request",
            data: []
        })
    }

    const { email, firstname, surname, password, phone } = req.body
    const customer_id = uuidv4()
    const otp = generateOTP()
    /**
     * check if user email exist before creating a new user
     * if email exist throw error
     * else go ahead to create the user
     */
    usersModel.checkUser(email, phone)
    .then(checkUserResult => {
        if (checkUserResult != "") {
            throw new Error(errorClass.CustomerExist)
        }

        return usersModel.newUser(email, firstname, surname, password, phone, customer_id)
    })
    .then(sendOtpResult => {
       //send to db
        return usersModel.insertOtp(customer_id,otp)
    })
    .then(newuserResult => {
        return smsServices.sendSMS(phone, `Hello, your otp is ${otp}`)
    })
    .then(newOtpResult => {
        res.status(200).send({
            status: true,
            message: errorClass.CustomerCreated,
            data: []
        })
    })
    .catch(checkUserErr => {
        console.log(checkUserErr)
            res.status(200).send({
                status: false,
                message:  checkUserErr.message || errorClass.GeneralError,
                response: []
         })
    })

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
    //         message: `${errorClass.CustomerCreated}. ${errorClass.OtpSentSuccessfully}`,
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

const verifyOTP = (req, res) => {

    const { customer, otp } = req.params

    // const OtpSchema = Joi.object({
    //     params: {
    //         customer: Joi.string().required(),
    //         otp: Joi.string().required()
    //     }
    // })

    // const validateOTP = OtpSchema.validate(req.params)
    // if (validateOTP.error) {
    //     res.status(422).send({
    //         status: false,
    //         message: errorClass.BadRequest,
    //         data: []
    //     })
    // }
    usersModel.getOtp(customer, otp)
    .then(otpResult => {

        if (otpResult == "") {
            throw new Error(errorClass.OtpMismatch)
        }
       console.log(otpResult)
        const elapsedTime = Date.now() -  otpResult[0].created_at
        if ((Math.floor(elapsedTime / 60000) > process.env.OTPExpirationTime
        )){
            throw new Error(errorClass.OtpExpired)
        }  
        //update datavad onis OTpverified

        res.status(200).send({
            status: false,
            message: errorClass.OtpVerificationSuccessful,
            data: []
        })

    })
    .catch(err => {
        res.status(400).send({
            status: false,
            message: err.message || errorClass.GeneralError,
            data: []
        })
    })



}


const updateUser = () => {

    res.status(200).send({
        status: true,
        message: "Account successfully updated",
        data: []
    })
}


module.exports = {
    createNewUser,
    getUser,
    updateUser,
    verifyOTP
}