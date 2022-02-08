require('dotenv').config()
const Joi = require('joi')
const { v4: uuidv4 } = require('uuid')
const msgClass = require('../errors/error')
const billsPaymentService = require('../services/bills_payments.services')
const transactionModels = require('../models/payment.models')
const purchasevalidation = require('../validations/purchases.validations')
const paymentServices = require('../services/payment.services')
const transferServices = require('../services/transfer.services')


const addTransferRecipient = async (req, res) => {

    const{accountName, accountNumber, bankCode} = req.body

    const recipientSchema = Joi.object({
        accountName: Joi.string().required(),
        accountNumber: Joi.string().required(),
        bankCode: Joi.string().required()
    })

    try{
        const responseFromJoiValidation = recipientSchema.validate(req.body)
        if(responseFromJoiValidation.error){
            throw new Error ("Bad request")
        }

        const addTransferRecipientResponse = await transferServices.createTransferRecipient(req.body)

        if(addTransferRecipientResponse.data.status == false){
            throw new Error ("Sorry, can't add recipient at the moment")
        }

        res.status(200).send({
            status: true,
            message: "Recipient added successfully",
            data: addTransferRecipientResponse.data.data
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

const initializingTransfer = async (req, res) =>{

    const{transferNote, amount, recipient_id} = req.body

    const transferSchema = Joi.object({
        amount: Joi.string().required(),
        transferNote: Joi.string().required(),
        recipient_id: Joi.string().required()
    })

    try{
        const responseFromJoiValidation = transferSchema.validate(req.body)
        if(responseFromJoiValidation.error){
            throw new Error ("Bad request")
        }

        const initialTransferResponse = await transferServices.initializeTransfer(req.body)

        if(initialTransferResponse.data.status == false){
            throw new Error ("Sorry, Transfer cannot be initiated at the moment")
        }

        res.status(200).send({
            status: true,
            message: "Transaction successfully initiated",
            data: initialTransferResponse.data.data
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



const fetchTransfer = async (req, res) => {

     const { transfer_id } = req.params
    
     try {
 
         const fetchTransferResponse = await transferServices.getTransfer(transfer_id)
         
         res.status(200).send({
             status: true,
             message: "successfully fetched transfer details",
             data: fetchTransferResponse.data.data
         })
     } 
     catch(e) {
         res.status(400).send({
             status: false,
             message:   e.message || msgClass.GeneralError
 
      })
     }

}

const getTransferRecipients = async (req, res) =>{

    try {
        const getAllRecipients = await transferServices.listTransferRecipient()
        res.status(200).send({
            status: true,
            message: "List of recipient successfully fetched",
            data: getAllRecipients.data
        })
    } catch (err) {
        res.status(400).send({
            status: false,
            message: err.message,
            data: null
        })
    }
}



module.exports = {
    addTransferRecipient,
    initializingTransfer,
    fetchTransfer,
    getTransferRecipients
    
}