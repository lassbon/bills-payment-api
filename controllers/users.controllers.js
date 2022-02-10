require('dotenv').config()
const { v4: uuidv4 } = require('uuid')
const Joi = require('joi')
const smsServices = require('../services/sms.services')
const emailServices = require('../services/email.services')
const usersModel = require('../models/users.models')
const msgClass = require('../errors/error')


const error = []

const generateOTP = ()=>{

    return Math.floor(Math.random() * 10000)
}

// +LOGIN-related SECTION related: (not yet completed) router.get('/user/:id') endpoint
const getUser = (req, res) => {  
   
    const { customer } = req.params
   
        res.status(200).send({
        status: true,
        message: msgClass.CustomerDetailsFetched,
        data: userDetails || []
    })
    
}
//******************************************************** */

// +SIGNUP-related SECTION:  router.post('/user/create') endpoint
const createNewUser = async (req, res) => {   

    // user-inputs (from front-end) validation using Joi (or alternatively, express-validator)
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
    // destructuring of data coming from front-end:
    const { email, firstname, surname, password, phone } = req.body
    const customer_id = uuidv4() // backend-generated
    const otp = generateOTP()   // from function written above
    
    //(.THEN ... .CATCH APPROACH):

    usersModel.checkUser(email, phone) // calling the db fn to check if user already exists
    .then(checkUserResult => {
        if (checkUserResult != "") {
            throw new Error(msgClass.CustomerExist)
        }

        return usersModel.createNewUser(email, firstname, surname, password, phone, customer_id)
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
        //console.log(checkUserErr)
            res.status(200).send({
                status: false,
                message:  checkUserErr.message || msgClass.GeneralError,
                response: []
         })
     })
     

    // (ASYNC....AWAIT APPROACH   NB: See ASYNC statement in line 32)
    try {
       const checkIfUserExists =  await usersModel.checkUser(email, phone)
        if (checkIfUserExists != "") {
            throw new Error(msgClass.CustomerExist)
        }  
        await usersModel.createNewUser(email, firstname, surname, password, phone, customer_id)
        await usersModel.insertOtp(customer_id, otp)
        //send otp to user after registration
        await smsServices.sendSMS(phone, `Hello, your otp is ${otp}`)  
        // views template related
        const userFullname = `${firstname} ${surname}` // needed for views
        const dataToUpdate = {
            "fullname": userFullname,
            "otp": otp
        }
        //calling the email service function to send email notification:
        emailServices.readFileAndSendEmail (email, "OTP VERIFICATION", dataToUpdate, 'otp')
        
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
}

// OTP VERIICATION related: router.get('/user/verify-otp/:customer/:email/:otp') endpoint
const verifyOTP = (req, res) => {

    const { customer, email, otp } = req.params

    usersModel.getOtp(customer, otp)  //calling db fn to check match/mismatch
    .then(otpResult => {
        //console.log("hereis otpResult: ", otpResult)
        if (otpResult == "") {
            throw new Error(msgClass.OtpMismatch)
        }
        
        const elapsedTime = Date.now() -  otpResult[0].created_at
        if ((Math.floor(elapsedTime / 60000) > process.env.OTPExpirationTime)) {
            throw new Error(msgClass.OtpExpired)
        }
        //update data vad onis OTpverified
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