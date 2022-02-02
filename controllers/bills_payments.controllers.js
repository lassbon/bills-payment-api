require('dotenv').config()
const Joi = require('joi')
const { v4: uuidv4 } = require('uuid')
const msgClass = require('../errors/error')
const billsPaymentService = require('../services/bills_payments.services')
const transactionModels = require('../models/payment.models')



const filteredresponse = (arr) => {
    return arr.filter(each =>  each.country == "NG" )
}



const getBillsPaymentCategories = async (req, res) => {
//const newObj = ['BIL111', 'BIL119', 'BIL120', 'BIL121' , 'BIL110']
    //1 = airtime
    //2 -= databundle
    //3 = power
    //4 = internet
    //5 = toll
    //6 = cables

let queryString=``
    let { type } = req.params
    
    switch (type) {
    case "1":
        queryString = `airtime=1`
        break
    case "2":
        queryString = `data_bundle=1`
        break
    case "3":
        queryString = `power=1`
        break
    case "4":
        queryString = `internet=1`
        break
    case "5":
        queryString = `toll=1`
        break
    case "6":
        queryString = `cables=1`
        break;
    default:
        queryString = `airtime=1&data_bundle=1&power=1&internet=1&toll=1&cables=1` 
    }
    try {
        const getAllCategories = await billsPaymentService.getBillsPaymentList(queryString)
        res.status(200).send({
            status: true,
            message: msgClass.BillsPaymentCategories,
            data: filteredresponse(getAllCategories.data.data)
           // added: getAllCategories.config.url
        })
    } catch (err) {
        console.log(err)
        res.status(400).send({
            status: false,
            message: err.message,
            data: null
        })
    }
    


}

const purchaseBillsPayment = async (req, res) => {
    const data = {
        customer_id,
        amount,
        customer_unique_number,
        transaction_reference: uuidv4()
    }
    //serviceToBuy can be phone for airtime, smartcard number for dstv, we called it customer_unique_number on our db
    // serviceType is gotten from billers category called  billers_name
    // name is gotten from billers category called  name
    await transactionModels.createNewTransaction(data)

    //todo: call to bill payment service for ransaction
    //const purchaseBills = billsPaymentService.purchases(data.serviceToBuy, data.amount, data.serviceType,data.name, data.customer_id)
  
}


const validateBillsPayment = async (req, res) => {

}



module.exports = {
    getBillsPaymentCategories,
    validateBillsPayment,
    purchaseBillsPayment
}