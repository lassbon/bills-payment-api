
const { v4: uuidv4 } = require('uuid')
const Joi = require('Joi')
const smsServices = require('../services/sms.services')




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

const createNewUser = (req, res) => {

    const userSchema = Joi.object({
        firstname: Joi.string().required(),
        surname: Joi.string().required(),
        email: Joi.email().required(),
        phone: Joi.string(), //length(11).pattern(/^[0-9]+$/),
        password: Joi.string().alphanum().required(),
    })

    const validateUser = userSchema.validate(req.body)
    if (validateUser.error) {
        throw new Error('Bad Request')
    }

    const { email, firstname, surname, password, phone } = req.body

    //call toinsert into my database 
   // const dbCall = await insertFunc()
    const response = smsServices.sendSMSOTP((phone, generateOTP()))
    if (response.success == true) {
        res.status(200).send({
            status: true,
            message: response.comment,
            data: []
        })
    
    }






   

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