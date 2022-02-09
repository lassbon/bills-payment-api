require('dotenv').config()
const sgMail = require('@sendgrid/mail')
const Handlebars = require("handlebars")
const fs = require('fs')
const path = require('path')
const { default: axios } = require('axios')
const { header } = require('express/lib/request')
 


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

    module.exports = {
        listInvoice,
        verifyInvioce,
        viewInvioce,
        updateInvoice
    }