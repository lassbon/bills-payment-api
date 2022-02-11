require('dotenv').config()
const { v4: uuidv4 } = require('uuid')
const Joi = require('Joi')
const smsServices = require('../services/sms.services')
const emailServices = require('../services/email.services')
const usersModel = require('../models/users.models')
const msgClass = require('../errors/error')
const { Successful } = require('../errors/error')


const error = []
 

const createInvoice = async (req, res) => {

    InvoiceOfItemToCreateSchema = Joi.object({
        "Customer id": { uuid },
        "amount": Joi.string().required(),
        "due_date": "Seller SA",           
        "description": joi.string().required(),
        "line_items": joi.string().required(),
        "tax": Joi.string().required(),
        "currency": Joi.string().required(),
        "send_notification": Joi.string().required(),
        "draft": Joi.string().required(),
        "has_invoice": Joi.string().required(),
        "invoice_number": Joi.string().required(),
        "split_code":Joi.string().required()
    })
    try{
        const validateInvoiceBeforeCreate = InvoiceOfItemToCreateSchema.validate(req.body)
            if(validateInvoiceBeforeCreate.error)
                throw new Error("Invoice is Invalid something went wrong, Please try again") ||
    res.status(201).send({
        status: Success,
        message: "Find attached your invoice below for reference",
        data: []

    })
    }

    catch(err){
        res.status(201).send({
            status: true,
            message: "Invoice Successfully generated",
            response: listInvoice.data.data
        })
    }
 
const createInvoiceModel = await paystack.invoiceItems.create({
        customer: '{{CUSTOMER_ID}}',
        price: '{{PRICE_ID}}',
        collection_method: 'send_invoice',
        amount: 
        days_until_due: 30
      });

invoiceModel.createNewInvoice(invoiceId, seller_name, buyer_name, item_1, amount, discount_kind, show_discount, sell_date)

return axios({
    method: "post",
    url: `${process.env.PAYSTACK_BASE_URL}/invoice/${invoiceId}/validate?code=${customerId}&customer=${phoneNumber}`,
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`
    }
})
}

const listInvoice = (req, res) => {
//const{perPage, page, customerID, status, currency, invoiceId } = req.params
    page = req.params.page 
    perPage = req.params.perPage
  
         try{
            await InvoiceService.listInvoice(invoiceID)
            if (InvoiceService.data.data.status = ! true){
                throw new Error("Cannot print this revoice. session timed out contact support '")
            }
        }
        catch(err){
            res.status(201).send({
                status: true,
                message: "Invoice Successfully generated",
                response: listInvoice.data.data
            })
        } 

    return axios({
            method: "get",
            url: `${process.env.PAYSTACK_BASE_URL}/invoice/listCustomer'sInvoice`,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
            }
        })

}
 
const viewInvioce = (req, res) => {

const { invoiceID } = req.params
const invoice = generateNewInvoice()
try{
   await viewInvioceFromServices.sendInvoice(invoice, `Find your invoivice below: ${generateNewInvoice}`)
   res.status(201).send({
    status: false,
    message: "Find attached your invoice below for reference",
    response: []
})
}
catch (err) {
res.status(200).send({
    status: true,
    message: msgClass.GeneralError,
    data: []
})
}

// or this 

return axios({
    method: "get",
    url: `${process.env.PAYSTACK_BASE_URL}/invoice/viewInvioce/NG`,
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
    }
}) 
 

}

const verifyInvioce = async (req, res) => {

 const { invoice_ref } = req.params

 try {

    const ResponseFromIvoiceVerification = await paymentService.verifyPayment(payment_ref)
    if (ResponseFromIvoiceVerification.data.data.status != "success") {
        throw new Error("We could not verify the this invoice on our system.")
    }
            // or
if (invoice_ref.error) {
    res.status(422).send({
        status: false,
      message: msgClass.BadRequest || `Invoice ${invoice_ref} is incorrect`,
        data: []
    })
}
    res.status(200).send({
        status: true,
        message: "This invoice generated successfully",
        data: ResponseFrominvoiceVerification.data.data
    })
}
 
catch(err) {
     res.status(400).send({
        status: false,
        message:   "Find attached your invoice below for reference" || msgClass.GeneralError

 })
}


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
    return axios({
        method: "get",
        url: `${process.env.PAYSTACK_BASE_URL}/invoice/viewInvioce/NG`,
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
        }
    })         
}

const FinalizeInvoice = async (req, res) => {

if(InvoiceOfItemToCreateSchema == invoice_ref)
const invoiceStore = []
try {
     await createInvoiceModel.getInvoiceByPhoneAndEmail(invoiceStore)
    res.status(200).send({
        status: true,
        message: msgClass.getInvoiceByPhoneAndEmail,
        data: getInvoiceByPhoneAndEmail.data
    })
} catch (err) {
     res.status(400).send({
        status: false,
        message: err.message,
        data: null
    })
}

return axios({
    method: "get",
    url: `${process.env.PAYSTACK_SECRET_KEY}/invoice/finalizeInvoice`,
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getToken.data.access_token}`
    },
    data: {
            "invoiceID":invoiceID,
            "amount": amount,
            "useLocalAmount": false,
            "customIdentity": uuidv4(),
            "customenrPhone": {
            "number": phoneNumber
            }
    }
})

}


const updateInvoice = (req, res) => {
const { content_type, customerID, amount,} = req.body
const { invoice_ref}

res.status(201).send({
    status: false,
    message: "Find attached your invoice below for reference",
    response: []
})
}

const updateTransaction =   async (data) => {
return new Promise( (resolve, reject) => {
    mysqlConnection.query({
        sql: `update invoice set seller_name, buyer_name, item_1, amount, discount_kind? where invoiceID=?`,
        values: [data.invoice_seller_name, data.invoice_buyer_name, data.item_1, data.amount, data.discount_kind, data.invoiceID]
    }
     ,  (err, results, fields) => {
         if (err) {
           reject(err);
         }
         resolve(results);
     })
  })


}


module.exports = {
    createInvoice,
    listInvoice,
    viewInvioce,
    verifyInvioce,
    sendNotification,
    FinalizeInvoice,
    updateInvoice,
    updateTransaction

}