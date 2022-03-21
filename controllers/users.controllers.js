require('dotenv').config()
const { v4: uuidv4 } = require('uuid')
const { Op } = require('sequelize')
const Joi = require('Joi')
const bcrypt = require('bcrypt')
const util = require('util')
const { isEmpty, doSomeAsyncMagik } = require('../utils/utils')
const saltRounds = 10

const smsServices = require('../services/sms.services')
const emailServices = require('../services/email.services')
//const usersModel = require('../models/users.models')
const models = require("../models")
const msgClass = require('../errors/error')
const logger = require('../logger')

const hashMyPassword = (mypassword) => {
    
    return new Promise((resolve, reject) => {

        bcrypt.genSalt(saltRounds,  (err, salt)=> {
            bcrypt.hash(mypassword, salt,  (err, hash)=> {
                if (err) {
                    reject(err)
                }
                resolve([salt, hash])
            });
        });
 

    })
}



const generateOTP = ()=>{

    return Math.floor(Math.random() * 10000)
}


const getUser = async(req, res) => {
   
    const  email  = req.body.customerEmail

    // const [err, getUserDetails] = await doSomeAsyncMagik(usersModel.getUserDetailsByEmail(email))
    const [err, getUserDetails] = await doSomeAsyncMagik(Customer.findAll({ where: { email: email } }))
    try {
        if (err) {
            throw new Error("Unable to complete action")
        }
        delete getUserDetails[0].password
        delete getUserDetails[0].sn

        res.status(200).send({
            status: true,
            message: "User detils fetched",
            data: getUserDetails
        })
    } catch (e) {
        res.status(400).send({
            status: false,
            message: "Error"
        })
    }
}

const createNewUser = async (req, res) => {

 
    const userSchema = Joi.object({
        firstname: Joi.string().required(),
        surname: Joi.string().required(),
        email: Joi.string().email().required(),
        phone: Joi.string(), //length(11).pattern(/^[0-9]+$/),
        password: Joi.string().required()
    })

    const validateUser = userSchema.validate(req.body)
    if (validateUser.error) {
        logger.info("Seems there was validation error %s", validateUser.error.details[0].message)
        //console.log(validateUser.error.details[0].message)
        res.status(422).send({
            status: false,
            message: validateUser.error.details[0].message
        })
    }

    const { email, firstname, surname, password, phone } = req.body
    const customer_id = uuidv4()
    const otp = generateOTP()
    try {
        // const [err, checkIfUserExists] = await doSomeAsyncMagik(usersModel.checkUser(email, phone))
        const [err, checkIfUserExists] = await doSomeAsyncMagik(models.customers.findOne({
            where: {
                [Op.or]: [
                    { email: email },
                    { phone: phone }
                ]
            }
        })
        )
        if (err) {
           logger.error("Error occured from checking if user exists:  %s", err)
            throw new Error("Internal Server Error")
        }
        if (!isEmpty(checkIfUserExists)) {
            console.log("here: ", checkIfUserExists)
            throw new Error("User with Email/Phone exists")
        }
    
    
        const  passwordHashed =  await hashMyPassword(password)
       
       // await usersModel.newUser(email, firstname, surname, passwordHashed[1] , phone, customer_id)
        await models.customers.create({ "email": email, "firstname":firstname, "surname":surname, "password":passwordHashed[1] , "phone":phone, "customer_id":customer_id })
       // await usersModel.insertOtp(customer_id, otp)
        await models.otp.create({"customer_id": customer_id, "otp":otp })
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

    } catch (e) {
        res.status(200).send({
            status: false,
            message: e.message || "It has happened."
        
        })
    }

    // try {
    //    const checkIfUserExists =  await usersModel.checkUser(email, phone)
    //     if (checkIfUserExists != "") {
    //         throw new Error(msgClass.CustomerExist)
    //     }  

     
    //     const passwordHashed =  await hashMyPassword(password)
    //     console.log(passwordHashed)
    //     await usersModel.newUser(email, firstname, surname, passwordHashed[1] , phone, customer_id)
    //     await usersModel.insertOtp(customer_id, otp)
    //     //send otp to user after registration
    //     await smsServices.sendSMS(phone, `Hello, your otp is ${otp}`)  
       
    //     const userFullname = `${firstname} ${surname}`
    //     const dataReplacement = {
    //         "fullname": userFullname,
    //         "otp": otp
    //     }

    //     emailServices.readFileAndSendEmail (email, "OTP VERIFICATION", dataReplacement, 'otp')
        
    //     res.status(200).send({
    //         status: true,
    //         message: msgClass.CustomerCreated,
    //         data: []
    //     })
    // } 
    // catch (err) {
    //     console.log(`error: ${err.message}`)
    //     res.status(200).send({
    //         status: false,
    //         message:   err.message || msgClass.GeneralError

    //  })
    // }
    
    
    
    

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
    resendOtp,
    hashMyPassword
}