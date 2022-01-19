
const { v4: uuidv4 } = require('uuid')
const Joi = require('Joi')
const smsServices = require('../services/sms.services')
const usersModel = require('../models/users.models')




const generateOTP = ()=>{

    return Math.floor(Math.random() * 10000)
}




const getUser = (req, res) => {

   
        res.status(200).send({
            status: true,
            message: "User details successfully fetched",
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

    usersModel.newUser(email, firstname, surname, password, phone, customer_id)
    .then(userResult => {
        console.log(userResult)
        const otp = generateOTP()
 
        return smsServices.sendSMSOTP(phone, otp)
    })
    .then(otpResult => {
        console.log('isent the otpp with response: ', (otpResult))
        res.status(200).send({
            status: true,
            message: "An otp has been sent to you email/phone",
            data: []
        })
     })
    .catch(err => {
        console.log(err)
        res.status(200).send({
                    status: false,
                    message: "Kindly try again later , This is on us",
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
    updateUser
}