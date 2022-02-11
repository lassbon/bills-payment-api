require('dotenv').config()
const { v4: uuidv4 } = require('uuid')
const Joi = require('Joi')
const smsServices = require('../services/sms.services')
const emailServices = require('../services/email.services')
const usersModel = require('../models/users.models')
const msgClass = require('../errors/error')


const error = []

const generateOTP = ()=>{

    return Math.floor(Math.random() * 10000)
}


const getUser = (req, res) => {
   
    const { customer } = req.params
   
        res.status(200).send({
            status: true,
            message: msgClass.CustomerDetailsFetched,
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
    /*
    //.then.catch approach

    usersModel.checkUser(email, phone)
    .then(checkUserResult => {
        if (checkUserResult != "") {
            throw new Error(msgClass.CustomerExist)
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
            message: msgClass.CustomerCreated,
            data: []
        })
    })
    .catch(checkUserErr => {
        console.log(checkUserErr)
            res.status(200).send({
                status: false,
                message:  checkUserErr.message || msgClass.GeneralError,
                response: []
         })
     })
     */
    try {
       const checkIfUserExists =  await usersModel.checkUser(email, phone)
        if (checkIfUserExists != "") {
            throw new Error(msgClass.CustomerExist)
        }  
        await usersModel.newUser(email, firstname, surname, password, phone, customer_id)
        await usersModel.insertOtp(customer_id, otp)
        //send otp to user after registration
        await smsServices.sendSMS(phone, `Hello, your otp is ${otp}`)  
       
        const userFullname = `${firstname} ${surname}`
        const dataReplacement = {
            "fullname": userFullname,
            "otp": otp
        }

        emailServices.readFileAndSendEmail (email, "OTP VERIFICATION", dataReplacement, 'otp')
        
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

const verifyOTP = (req, res) => {

    const { customer, email, otp } = req.params

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
    //         message: msgClass.BadRequest,
    //         data: []
    //     })
    // }

    usersModel.getOtp(customer, otp)
    .then(otpResult => {
        //console.log("hereis otpResult: ", otpResult)
        if (otpResult == "") {
            throw new Error(msgClass.OtpMismatch)
        }
        
        const elapsedTime = Date.now() -  otpResult[0].created_at
        if ((Math.floor(elapsedTime / 60000) > process.env.OTPExpirationTime)) {
            throw new Error(msgClass.OtpExpired)
        }
        //update datavad onis OTpverified
        usersModel.deleteOTP(otp, otpResult[0].customer_id)
        usersModel.updateOTPStatus(otpResult[0].customer_id)

    })
        .then(finalResponse => {
            const dataToUpdate = {}
    
            emailServices.readFileAndSendEmail (email, "WELCOME ONBOARD", dataToUpdate, 'welcome')
            
        res.status(200).send({
            status: false,
            message: msgClass.OtpVerificationSuccessful,
            data: []
        })
    })
    .catch(err => {
        res.status(400).send({
            status: false,
            message: err.message || msgClass.GeneralError,
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


const resendOtp =   async (req, res) => {
    const { phone } = req.params
    const otp = generateOTP()
    
    try {

        const userDetails = await usersModel.getUserDetailsByPhone(phone)
        await usersModel.deleteOTPByCustomerID(userDetails[0].customer_id)
        await usersModel.insertOtp(userDetails[0].customer_id, otp)
        await smsServices.sendSMS(phone, `Hello, your new otp is ${otp}`)
        
        res.status(200).send({
            status: true,
            message: msgClass.OtpResentSentSuccessfully,
            data: []
        })

    } catch (err) {
        console.log(err)
        res.status(200).send({
            status: true,
            message: msgClass.GeneralError,
            data: []
        })
    }


  
}

module.exports = {
    createNewUser,
    getUser,
    updateUser,
    verifyOTP,
    resendOtp
}