require('dotenv').config()
//const { v4: uuidv4 } = require('uuid')
const Joi = require('joi')
const msgClass = require('../errors/error')
const paymentService = require('../services/payment.services')


const createNewSubaccount = async (req, res) => {

    const subaccountSchema = Joi.object({
        business_name: Joi.string().required(),
        settlement_bank_code: Joi.string().required(),
        account_number: Joi.string().required()        
    })

    const validateUser = subaccountSchema.validate(req.body)
    if (validateUser.error) {
        res.status(422).send({
            status: false,
            message: "Bad Request",
            data: []
        })
    }
   const  { business_name, settlement_bank_code, account_number } = req.body
   //const description = `A subaccount for ${business_name}`
   try {
       const subaccCreationResponse = await paymentService.createSubaccount(req.body)
       if (subaccCreationResponse.data.staus == false) {
           throw new Error ("Sorry, something went wrong. Pls try again later")
       }
       res.status(200).send({
        status: true,
        message: "Subaccount successfully created",
        data: subaccCreationResponse.data.data
    })


   }
   catch(err) {    
     res.status(400).send({
         status: false,
         message:   err.message || msgClass.GeneralError

  })
 }
}

const listSubaccounts = async (req, res) => {  
   
   try {
       const subaccListResponse = await paymentService.listSubaccount(req.params)
       if (subaccListResponse.data.status == false) {
           throw new Error ("Sorry, something went wrong. Pls try again later")
       }
       res.status(200).send({
        status: true,
        message: "Subaccounts successfully retieved",
        data: subaccListResponse.data.data
    })


   }
   catch(err) {    
     res.status(400).send({
         status: false,
         message:   err.message || msgClass.GeneralError

  })
 }
}

const getSubaccount = async (req, res) => { 
    const  { id } = req.params
    try {
        const getSubaccountResponse = await paymentService.getSubaccount(req.params)
        if (getSubaccountResponse.data.status == false) {
            throw new Error ("Sorry, something went wrong. Pls try again later")
        }
        res.status(200).send({
         status: true,
         message: "Subaccount successfully retieved",
         data: subaccListResponse.data.data
     })
 
 
    }
    catch(err) {    
      res.status(400).send({
          status: false,
          message:   err.message || msgClass.GeneralError
 
   })
  }
 }




module.exports = {
    createNewSubaccount,
    listSubaccounts,
    getSubaccount
}