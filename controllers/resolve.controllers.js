require('dotenv').config()
const Joi = require('joi')
const { v4: uuidv4 } = require('uuid')
const msgClass = require('../errors/error')
const resolveService = require('../services/resolve.serivces')


const BvnResolve = async (req, res) => {

    const { BVN } = req.query
    
    const resolveSchema = Joi.object({
       bvn: Joi.string().required() 
    })

    try {
    const responseFromJoiValidation = resolveSchema.validate(req.query)
        if (responseFromJoiValidation.error) {
            throw new Error("Bad request")
        }
        const resolveBvnResponse = await resolveService.BvnResolve(req.query)
        
        console.log("Got back from paysatck: ", JSON.stringify(resolveBvnResponse.data))
        if (resolveBvnResponse.data.status == false) {
           throw new Error("Sorry, BVN service unavailable and cannot be resolved at this moment")
            
        }
    
        res.status(200).send({
            status: true,
            message: "BVN successfully resolved",
            data: resolveBvnResponse.data.data
        })
    } 
    catch(e) {
        res.status(400).send({
            status: false,
            message: e.message || msgClass.GeneralError
     })
   }

}

const accountResolve = async (req, res) => {

     const { ACCOUNT_NUMBER, BANK_CODE } = req.query
     
     const resolveSchema = Joi.object({
        account_number: Joi.string().required(),
        bank_code: Joi.string().required(),
     })

     try {
     const responseFromJoiValidation = resolveSchema.validate(req.query)
         if (responseFromJoiValidation.error) {
             throw new Error("Bad request")
         }
         const resolveAccountResponse = await resolveService.resolveAccountNumber(req.query)
         
         console.log("Got back from paysatck: ", JSON.stringify(resolveAccountResponse.data))
         if (resolveAccountResponse.data.status == false) {
            throw new Error("Sorry, Account cannot be resolved at this moment")
             
         }
     
         res.status(200).send({
             status: true,
             message: "Account successfully resolved",
             data: resolveAccountResponse.data.data
         })
     } 
     catch(e) {
         res.status(400).send({
             status: false,
             message: e.message || msgClass.GeneralError
      })
    }
 
}

const CardbinResolve = async (req, res) => {

    const { BIN } = req.query
    
    const resolveSchema = Joi.object({
       bin: Joi.string().required(),
    })

    try {
    const responseFromJoiValidation = resolveSchema.validate(req.query)
        if (responseFromJoiValidation.error) {
            throw new Error("Bad request")
        }
        const resolveCardbinResponse = await resolveService.resolveCardBin(req.query)
        
        console.log("Got back from paysatck: ", JSON.stringify(resolveCardbinResponse.data))
        if (resolveCardbinResponse.data.status == false) {
           throw new Error("Sorry, Card-Bin cannot be resolved at this moment")
            
        }
    
        res.status(200).send({
            status: true,
            message: "Card-Bin successfully resolved",
            data: resolveCardbinResponse.data.data
        })
    } 
    catch(e) {
        res.status(400).send({
            status: false,
            message: e.message || msgClass.GeneralError
     })
   }

}

const PhoneNumberResolve = async (req, res) => {

    const { verification_type, phone, callback_url } = req.body
    
    const resolveSchema = Joi.object({
       verification_type: Joi.string().required(),
       phone: Joi.number().required(),
       callback_url: Joi.string().required(),
       
    })

    try {
    const responseFromJoiValidation = resolveSchema.validate(req.body)
        if (responseFromJoiValidation.error) {
            throw new Error("Bad request")
        }
        const resolvePhoneNumberResponse = await resolveService.resolvePhoneNumber(req.body)
        
        console.log("Got back from paysatck: ", JSON.stringify(resolvePhoneNumberResponse.data))
        if (resolvePhoneNumberResponse.data.status == false) {
           throw new Error("Sorry, Phone-number cannot be resolved at this moment")
            
        }
    
        res.status(200).send({
            status: true,
            message: "Phone-number successfully resolved",
            data: resolvePhoneNumberResponse.data.data
        })
    } 
    catch(e) {
        res.status(400).send({
            status: false,
            message: e.message || msgClass.GeneralError
     })
   }

}
module.exports= {
    BvnResolve,
    accountResolve,
    CardbinResolve,
    PhoneNumberResolve
    
}