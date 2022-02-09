require('dotenv').config()
const Joi = require('joi')
const msgClass = require('../errors/error')
const customerService = require('../services/customer.services')
const customerModel = require('../models/customer.models')




const createNewCustomer = async (req,res) => {

    const{ email, first_name, last_name, phone} = req.body

    const customerSchema = Joi.object({
        email: Joi.string().email().required(),
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        phone: Joi.string()
    })
    try {
    const responseFromJoiValidation = customerSchema.validate(req.body)
        if(responseFromJoiValidation.error) {
            throw new Error("Bad request")
        }
        const createCustomerResponse = await customerService.createCustomer(req.body)
        console.log("Got back from paysatck: ", JSON.stringify(createCustomerResponse.data))
        if (createCustomerResponse.data.status ==false) {
            throw new Error("Customer hasn't been created")
        }

        res.status(200).send({
            status: true,
            message: "Customer created",
            data: createCustomerResponse.data.data
        })  
    }
    catch(error){
        res.status(400).send({
            status:false,
            message: error.message || msgClass.GeneralError
        })
    }

}


const listCustomers = async (req,res) => {
    const perPage = req.params.perPage || 50
    const page = req.params.page || 1

    try{
        const getCustomersListResponse = await customerService.getCustomersList(perPage, page)
        if (getCustomersListResponse.data.data.status != "success"){
            throw new Error("Customer list could not be fetched")
        }

        res.status(200).send({
            status: true,
            message: "Customers recieved",
            data: getCustomersListResponse.data.data
        })
    }
    catch(e) {
        // console.log(`error: ${e.message}`)
         res.status(400).send({
             status: false,
             message:   e.message || msgClass.GeneralError
 
      })
     }
}

const getCustomer = async (req, res) => {

     const { email } = req.params
    
     try {
 
         const fetchCustomerResponse = await customerService.fetchCustomer(email)
         if (fetchCustomerResponse.data.data.status != "success") {
             throw new Error("We could not fetch Customer")
         }
         
         res.status(200).send({
             status: true,
             message: "Customer retrieved",
             data: fetchCustomerResponse.data.data
         })
     } 
     catch(error) {
        // console.log(`error: ${e.message}`)
         res.status(400).send({
             status: false,
             message:   error.message || msgClass.GeneralError
 
      })
     }
     
     
}     



const customerUpdate = async (req,res) => {

    // const{first_name} = req.params

    const{first_name, last_name} = req.body

    const customerSchema = Joi.object({
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        
    })
    try {
    const responseFromJoiValidation = customerSchema.validate(req.body)
        if(responseFromJoiValidation.error) {
            throw new Error("Bad request")
        }
        const updateCustomerResponse = await customerService.updateCustomer(req.body)
        if (updateCustomerResponse.data.status ==false) {
            throw new Error("Customer could not update")
        }

        res.status(200).send({
            status: true,
            message: "Customer updated",
            data: updateCustomerResponse.data.data
        })  
    }
    catch(error){
        res.status(400).send({
            status:false,
            message: error.message || msgClass.GeneralError
        })
    }

}


const whiteOrBlackListCustomer = (req,res) => {

    const { email , risk_action} = req.body

    const possible_risk_actions = ["default", "allow", "deny"]
        if (!(req.body.risk_action in possible_risk_actions)){
            throw new Error("error")
        }
    res.status(200).send({
        status: true,
        message: "Customer updated",
        data: updateCustomerResponse.data.data
    })  


}



module.exports = {
    createNewCustomer,
    listCustomers,
    getCustomer,
    customerUpdate,
    whiteOrBlackListCustomer,
}