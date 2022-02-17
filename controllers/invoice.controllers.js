require('dotenv').config()
const { v4: uuidv4 } = require('uuid')
const Joi = require('Joi')
//const smsServices = require('../services/sms.services')
//const emailServices = require('../services/email.services')
const usersModel = require('../models/users.models')
const msgClass = require('../errors/error')
const { Successful } = require('../errors/error')


const error = []
 

const createInvoice = async (req, res) => {

    InvoiceOfItemToCreateSchema = Joi.object({
        "Customer_id": Joi.string().required(),
        "amount": Joi.string().required(),// this is Payment request amount. It should be used when line items and tax values aren't specified.
        "due_date": "Seller SA",   //this is representation of request due date         
        "description": joi.string().required(), // It's a short description of the payment request
        "line_items": joi.string().required(),
        "tax": Joi.string().required(),
        "currency": Joi.string().required(),
        "send_notification": Joi.string().required(),
        "draft": Joi.string().required(),
        "has_invoice": Joi.string().required(),
        "invoice_number": Joi.string().required(),
        "split_code":Joi.string().required()
    })

    const validateInvoice = InvoiceOfItemToCreateSchema.validate(req.body)

    if (validateInvoice.error) {
         res.status(422).send({
            status: false,
            message: "Bad Request"
        })
    }
    const {Customer_id, amount, due_date, has_invoice, invoice_number } = req.body
    try{
        const validateInvoiceBeforeCreate = InvoiceOfItemToCreateSchema.validate(req.body)
            if(validateInvoiceBeforeCreate.error){
                throw new Error("Invoice is Invalid something went wrong, Please try again") 
                 
            }  
            if(!validateInvoiceBeforeCreate){
                throw new Error("We don't have reciept for this invoice")

            } 
        await invoiceModels.newInvoice(Customer_id, amount, due_date, has_invoice, invoice_number)
        
  
    }

    catch(err){
        res.status(201).send({
            status: true,
            message: "This Invoice cannot found",
        })
    }

}

const listInvoice =  (req, res) => {
const{perPage, page, customerID, status, currency, invoiceId } = req.params
    const page = req.params.page   || 60
    const perPage = req.params.perPage || 5
  
         try{
            InvoiceFromService.invoiceService.listInvoice(req.query)
            if (InvoiceFromService.data.data.status != true){
                throw new Error("Cannot print this revoice. session timed out contact support '")
            }
            res.status(200).send({
                status: true,
                message:InvoiceFromService.data.data.message,
                data: InvoiceFromService.data.data
            })
        }
        catch(err){
            res.status(201).send({
                status: true,
                message: "Invoice Successfully generated",
                response: listInvoice.data.data
            })
        } 

}
 
const viewInvioce = (req, res) => {

const { invoice_ID } = req.params
const invoice = generateNewInvoice(invoice_ID)
try{
   const respViewInvioceFromServices = await viewInvioceFromServices.viewInvoice(invoice)
   res.status(201).send({
    status: false,
    message: "Find attached your invoice below for reference",
    response: respViewInvioceFromServices.data.data.message
})
}
catch (err) {
res.status(200).send({
    status: true,
    message: msgClass.GeneralError || "Invalid Invoice",
    data: []
})
}


}

const verifyInvioce = async (req, res) => {

 const { invoice_ref } = req.params

 try {

    const ResponseFromIvoiceVerification = await paymentService.verifyPayment(invoice_ref)
    if (ResponseFromIvoiceVerification.data.data.status != "success") {
        throw new Error("We could not verify the this invoice on our system.")
    }
    
}
 
catch(err) {
     res.status(400).send({
        status: false,
        message:   "Find attached your invoice below for reference" || msgClass.GeneralError

 })
}

            // or
   /*  if (invoice_ref.error) {
                res.status(422).send({
                    status: false,
                  message: msgClass.BadRequest || `Invoice ${invoice_ref} is incorrect`,
                    data: []
                })
        }else{
                res.status(200).send({
                    status: true,
                    message: "This invoice generated successfully",
                    data: ResponseFrominvoiceVerification.data.data
                })
            
            } */


}

const sendNotification = async (req, res) => {

const { email, phone } = req.params

if ( invoice_ref != ''){
    throw new Error('This invoice cannot be found')
}
   
    try{
        await InvoiceOfItemToCreateInModel.getInvoiceByPhoneAndEmail(email, phone);
    }
    catch (err) {
        res.status(200).send({
            status: true,
            message:"Notification cannot tbe send to user",
            data: []
        })
    }       
}

const FinalizeInvoice = async (req, res) => {

    const { invoice_ref } = req.params
 
try {
     const finalizeInvoiceRes = await createInvoiceService.finalizeInvoiceDetails(invoice_ref)
     if(finalizeInvoiceRes != invoice_ref){
        res.status(200).send({
            status: true,
            message: msgClass.getInvoiceByPhoneAndEmail,
            data: getInvoiceByPhoneAndEmail.data
        })
     }
     
} catch (err) {
     res.status(400).send({
        status: false,
        message: err.message || "Cannot generate inovice at this moment" || msgClass.GeneralError,
        data: null
    })
}

}


const updateInvoice = () => {
    

    res.status(200).send({
        status: true,
        message: "Invoice successfully updated",
        data: []
    })
}




module.exports = {
    createInvoice,
    listInvoice,
    viewInvioce,
    verifyInvioce,
    sendNotification,
    FinalizeInvoice,
    updateInvoice
    
}