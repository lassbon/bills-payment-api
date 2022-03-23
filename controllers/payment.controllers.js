require('dotenv').config()
const Joi = require('joi')
const { v4: uuidv4 } = require('uuid')
const msgClass = require('../errors/error')
const paymentService = require('../services/payment.services')
const paymentModel = require('../models/payment.models')
const { isEmpty, doSomeAsyncMagik } = require('../utils/utils')



const createTransaction = async (req, res) => {


   // const { amount, paymentOptionType, email, phone, fullname, customer_id } = req.body
    const { amount, email } = req.body
    
    const paymentSchema = Joi.object({
       // fullname: Joi.string().required(),
        email: Joi.string().email().required(),
       // phone: Joi.string(), //length(11).pattern(/^[0-9]+$/),
        amount: Joi.string().required(),
       // customer_id: Joi.string().required(),

        paymentOptionType: Joi.string().valid('card','banktransfer','ussd').required()

    })
    try {
    const responseFromJoiValidation = paymentSchema.validate(req.body)
        if (responseFromJoiValidation.error) {
            throw new Error("Bad request")
        }
        const paymentInitializationResponse = await paymentService.initalizePayment(req.body)
        
       // console.log("Got back from paysatck: ", JSON.stringify(paymentInitializationResponse.data))
        if (paymentInitializationResponse.data.status == false) {
           throw new Error("Sorry, payment cannot be initialise this moment")
            
        }
        //initiate on our db
       // await paymentModel.createNewTransaction(customer_id, data.amount, data.payment_channel, data.payment_status, , data.transaction_date)

        res.status(200).send({
            status: true,
            message: "Transaction successfully initiated",
            data: paymentInitializationResponse.data.data
        })
    } 
    catch(e) {
       // console.log(`error: ${e.message}`)
        res.status(400).send({
            status: false,
            message:   e.message || msgClass.GeneralError

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


const verifyTransaction = async (req, res) => {


    // const { amount, paymentOptionType, email, phone, fullname, customer_id } = req.body
    const { payment_ref } = req.params

    
 

    // paymentService.verifyPayment(payment_ref)
    //     .then(result => {
    //     res.status(200).send({
    //                  status: true,
    //                  message: "Transaction successfully found",
    //                  data: result.data.data
    //     })
    // })
    //     .catch(error => {
          
    //             if (result.data.status == false) {
    //             throw new Error("Omo you got Alli, o se matric, ko gbe rice wa ")
    //         }
    //     res.status(200).send({
    //                  status: true,
    //                  message: error.message || "Transaction not found"
    //              })
    // })
    
    try {
 
        const [paymentVerificationResponse, paymentVerificationErr] = await paymentService.verifyPayment(payment_ref)
        if (paymentVerificationErr) {
            throw new Error("We could not verify the amount paid. Kindly contact support")
        }
         
        res.status(200).send({
            status: true,
            message: "Transaction successfully initiated",
            data: paymentVerificationResponse.data.data
        })
    }
    catch (err) {
        console.log("eeeee: ", err)
        res.status(400).send({
            status: false,
            message: err
 
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
        const createCustomerResponse = await paymentService.createCustomer(req.body)
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
    const perPage = parseInt(req.query.perPage) || 50
    const page = parseInt(req.query.page) || 1

    try{
        const getCustomersListResponse = await paymentService.getCustomersList(perPage, page)
        console.log('i got here')
        if (getCustomersListResponse.data.status != true){
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
             message: e.message || msgClass.GeneralError
 
      })
     }
}

const getCustomer = async (req, res) => {

     const { email } = req.params
    
     try {
 
         const fetchCustomerResponse = await paymentService.fetchCustomer(email)
         console.log(fetchCustomerResponse.data)
         if (fetchCustomerResponse.data.status != true) {
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

    // const{id_} = req.params

    // const{id, first_name, last_name} = req.body

    const customerSchema = Joi.object({
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        
    })
    try {
    const responseFromJoiValidation = customerSchema.validate(req.body)
        if(responseFromJoiValidation.error) {
            throw new Error("Bad request")
        }
        const updateCustomerResponse = await paymentService.updateCustomer(req.body)
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





const whiteOrBlackListCustomer = async (req,res) => {

    const { customer , risk_action} = req.body

    const whiteListschma = Joi.object({
        customer: Joi.string().required(),
        risk_action: Joi.string().valid("default", "allow", "deny").required()
    })
    paymentService.blackOrWhiteListing(req.body)
    .then(hikmah => {
        return hikmah.json()
    })
    .then(result => {
        res.status(200).send({
                        status: true,
                        message: "success",
                        data: result.data
            }) 
    })
    .catch(err => {
        console.log(`error happened: `, err)
        res.status(422).send({
                        status:false,
                        message: err
                    })
    })

// try{
//     const responseFromJoiValidation = whiteListschma.validate(req.body)
//     console.log("i was able to validate")
//         if (responseFromJoiValidation.error){
//             throw new Error("Invalid input")
//         }
    
//         console.log("i am gpoing to call the service")
//         const  [err, responseWhiteBlacklistCustomer] = await doSomeAsyncMagik(paymentService.blackOrWhiteListing(req.body))
       
//         if (err){
//           //  console.log("error: ", err)
//             throw new Error("Something happened")

//         }
//         console.log("i got a response", JSON.stringify(responseWhiteBlacklistCustomer))

//         res.status(200).send({
//             status: true,
//             message: responseWhiteBlacklistCustomer.data.message,
//             data: responseWhiteBlacklistCustomer.data.data
//         })  
    
//     }
//     catch(error){
//         res.status(422).send({
//             status:false,
//             message: error
//         })
//     }
}
    



}



module.exports = {
    createTransaction,
    verifyTransaction,
    createNewCustomer,
    listCustomers,
    getCustomer,
    customerUpdate,
    whiteOrBlackListCustomer
}