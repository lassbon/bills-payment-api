require('dotenv').config()
//const { v4: uuidv4 } = require('uuid')
const Joi = require('joi')
const msgClass = require('../errors/error')
const paymentService = require('../services/payment.services')




const createNewSubaccount = async (req, res) => {
    const  { business_name, settlement_bank, account_number, percentage_charge } = req.body
    //const percentage_charge = 0.001
    //console.log('here:', req.body)
    const subaccountSchema = Joi.object({
        business_name: Joi.string().required(),
        settlement_bank: Joi.string().required(),
        account_number: Joi.string().required(),
        percentage_charge: Joi.number().required()       
    })

    const validateUser = subaccountSchema.validate(req.body)
    if (validateUser.error) {
        //console.log('here', validateUser.error)
        res.status(422).send({
            status: false,
            message: "Bad Request",
            data: []
        })
    }
    else {
        //const  { business_name, settlement_bank, account_number, percentage_charge } = req.body
           
        //const description = `A subaccount for ${business_name}`
        
        try {
            console.log('GOT HERE: 1')
            const subaccCreationResponse =  await paymentService.createSubaccount(business_name, settlement_bank, account_number, percentage_charge)
            console.log('GOT HERE: 2', subaccCreationResponse)
            if (!subaccCreationResponse) {
                throw new Error ("Sorry, something went wrong. Pls try again later")
            } 
            console.log('GOT HERE: 3')           
            res.status(200).send({
                 status: true,
                 message: "Subaccount successfully created",
                 data: subaccCreationResponse.data
             })
            }
        catch(err) {    
          res.status(400).send({
              status: false,
              message:   err.message || msgClass.GeneralError

            })
        }
    }       
}   


/*const listSubaccounts = async (req, res) => {  
    let listSizePerPage = (req.query.perPage)? parseInt(req.query.perPage) : 25
    
    let pageToGet = (req.query.page)? parseInt(req.query.page) : 1   
   try {
        console.log('got here 1')
       const subaccountListResponse = await paymentService.listSubaccounts(listSizePerPage, pageToGet)
       console.log('here:', subaccountListResponse.data)
       if (subaccountListResponse.data.status == false) {
        //if (!subaccountListResponse) {
           throw new Error ("Sorry, something went wrong. Pls try again later")
       }
       res.status(200).send({
        status: true,
        message: "Subaccounts successfully retrieved",
        data: subaccountListResponse.data.data
    })


   }
   catch(err) {    
     res.status(400).send({
         status: false,
         message:   err.message || msgClass.GeneralError

  })
 }
}*/

const listSubaccounts = (req, res) => {
    let listSizePerPage = (req.query.perPage)? parseInt(req.query.perPage) : 25
    let pageToGet = (req.query.page)? parseInt(req.query.page) : 1
    
    paymentService.listSubaccounts(listSizePerPage, pageToGet)
    .then((subaccountListResponse)=> {
        if (subaccountListResponse.data.status == false) {
            //if (!subaccountListResponse) {
               throw new Error ("Sorry, something went wrong. Pls try again later")
           }
           res.status(200).send({
            status: true,
            message: "Subaccounts successfully retrieved",
            data: subaccountListResponse.data.data
        })
    })
    .catch((e)=> {
        res.status(400).send({
            status: false,
            message:   e.message || msgClass.GeneralError
        })
    })

}



const getSubaccount = async (req, res) => { 
    const  { id } = req.params
    try {
        const getSubaccountResponse = await paymentService.getSubaccount(id)
        if (getSubaccountResponse.data.status == false) {
            throw new Error ("Sorry, something went wrong. Pls try again later")
        }
        res.status(200).send({
         status: true,
         message: "Subaccount successfully retrieved",
         data: getSubaccountResponse.data.data
        })
 
 
    }

    catch(err) {    
        res.status(400).send({
          status: false,
          message:   err.message || msgClass.GeneralError 
        })
    }
}

/*
const updateSubaccount = ()=> {
    const  { business_name, settlement_bank_code } = req.body
    const { id } = req.params
    const subaccountSchema = Joi.object({
        business_name: Joi.string().required(),
        settlement_bank_code: Joi.string().required()                
    })
    
    try {
        const validateUser = subaccountSchema.validate(req.body)
        if (validateUser.error) {
            res.status(422).send({
                status: false,
                message: "Bad Request",
                data: []
            })
        }
        const subaccountUpdateResponse = await paymentService.updateSubaccount(req.body)
        if (subaccountUpdateResponse.data.staus == false) {
            throw new Error ("Sorry, something went wrong. Pls try again later")
        }
        res.status(200).send({
            status: true,
            message: "Subaccount successfully updated",
            data: subaccountUpdateResponse.data.data
        })
    }
    catch(err) {    
        res.status(400).send({
          status: false,
          message:   err.message || msgClass.GeneralError 
        })
    }

}*/

const updateSubaccount = (req, res)=> {
    const  { business_name, settlement_bank_code } = req.body
    const { id } = req.params
    //const id  = req.params.id
    //console.log('got here: 1', id)
    const subaccountSchema = Joi.object({
        business_name: Joi.string().required(),
        settlement_bank: Joi.string().required()                
    })
    const validateUser = subaccountSchema.validate(req.body)
    if (validateUser.error) {
        res.status(422).send({
            status: false,
            message: "Bad Request",
            data: []
        })
    } 
    else { 
        //console.log('got here: 2')
        paymentService.updateSubaccount(business_name, settlement_bank_code, id)        
        .then((subaccountUpdateResponse)=> {
            if (subaccountUpdateResponse.data.status == false) {
                throw new Error ("Sorry, something went wrong. Pls try again later")
            }
            res.status(200).send({
                status: true,
                message: "Subaccount successfully updated",
                data: subaccountUpdateResponse.data.data
            })

        })
        .catch((err) => {    
            res.status(400).send({
              status: false,
              message:   err.message || msgClass.GeneralError 
            })
        })
    }
}
    

module.exports = {
    createNewSubaccount,
    listSubaccounts,
    getSubaccount,
    updateSubaccount
}