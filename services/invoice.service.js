require('dotenv').config()
const sgMail = require('@sendgrid/mail')
const Handlebars = require("handlebars")
const fs = require('fs')
const path = require('path')
const { default: axios } = require('axios')
const { header } = require('express/lib/request')
 

const createNewInvoice = (invoiceId, seller_name, buyer_name, item_1, amount, discount_kind, show_discount, sell_date) =>{
    
return axios({
    method: "post",
    url: `${process.env.PAYSTACK_BASE_URL}/invoice/${invoiceId}/validate?code=${customerId}&customer=${phoneNumber}`,
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`
    }
})

}


const listInvoice = (perPage, page, customerID, currency, invoiceId) => {
    return axios({
        method: "get",
        url: `${process.env.PAYSTACK_BASE_URL}/invoice/verify/${invoice_ref}`,
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
        },
})
}

const verifyInvioce = async(invoice_ref) => {

    return axios({
            method: "get",
            url: `${process.env.VERIFYINVOICE}/invoice/verify/${invoice_ref}`,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
            },
    })
        
    }
const viewInvioce = () => {

    return axios({
        method: "get",
        url: `${process.env.VIEWINVOICE}/invoice/verify/${invoice_ref}`,
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
        },
})
}

const updateInvoice = () => {
    return axios({
        method: "get",
        url: `${process.env.UPDATEINVOICE}/invoice/verify/${invoice_ref}`,
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
            "description": "Update test invoice", "due_date": "2017-05-10" 
        },
})


}

const FinalizeInvoice = () => {

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



    module.exports = {
        createNewInvoice,
        listInvoice,
        verifyInvioce,
        viewInvioce,
        updateInvoice,
        FinalizeInvoice
    }