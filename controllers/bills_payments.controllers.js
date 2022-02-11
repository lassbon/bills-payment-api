require('dotenv').config()
const Joi = require('joi')
const { v4: uuidv4 } = require('uuid')
const msgClass = require('../errors/error')
const billsPaymentService = require('../services/bills_payments.services')
const transactionModels = require('../models/payment.models')
const purchasevalidation = require('../validations/purchases.validations')
const paymentServices = require('../services/payment.services')



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
    // let { type } = req.params
    
    
    try {
        const getAllCategories = await billsPaymentService.getBillsPaymentList()
        console.log(`here: ${getAllCategories.data}`)
        res.status(200).send({
            status: true,
            message: msgClass.BillsPaymentCategories,
            data: getAllCategories.data
        })
    } catch (err) {
       // console.log(err)
        res.status(400).send({
            status: false,
            message: err.message,
            data: null
        })
    }
    


}

const purchaseBillsPayment = async (req, res) => {

    const validateUser = purchasevalidation.validate(req.body)

    console.log(validateUser)
    if (validateUser.error) {
        res.status(422).send({
            status: false,
            message: "Bad Request",
            data: null
        })
    }

    const { operatorID, amount, phoneNumber } = req.body

        // const data = {
        //     customer_id,
        //     amount: parseFloat(amount),
        //     customer_unique_number,
        //     serviceType,
        //     name,
        //     payment_ref,
        //     transaction_reference: uuidv4()
        // }
    //serviceToBuy can be phone for airtime, smartcard number for dstv, we called it customer_unique_number on our db
    // serviceType is gotten from billers category called  billers_name
    // name is gotten from billers category called  name
    try {
        
            // const respFromTransaction = await transactionModels.createNewTransaction(data)
            // if (!respFromTransaction.insertId) {
            //     throw new Error("Something went wrong ")
            // }

            // const respFromTransactionResultID = respFromTransaction.insertId

        //go to flutterwave to verify that transaction 
       // const paymentResponse = await paymentServices.verifyPayment(payment_ref)

        
     

    // if (!paymentResponse) {
       
    //     throw new Error("Kindly make payment as we couldnt confim payment")
    // }

  //   console.log("i got here afetr payment verification: ", paymentResponse.data.data.tx_ref, paymentResponse.data.data.flw_ref)
        
    //const dataToUpdateOnMyLocalDBPaymentFLW_REF = paymentResponse.data.data.flw_ref
    //const dataToUpdateOnMyLocalDBPaymentTX_REF = paymentResponse.data.data.tx_ref
    
    //todo: call to bill payment service for transaction
    const purchaseBills = await billsPaymentService.purchases(operatorID, amount, phoneNumber)
   
    // if (!purchaseBills.data.data.flw_ref || !purchaseBills.data.data.tx_ref) {
    //     //refund the customeer
    //     throw new Error("Apologies, we couldnt complete the transaction, we will refund in 24hrs")
    // }

    // const dataToUpdateOnMyLocalDBTransactionFLW_REF = purchaseBills.data.data.flw_ref
    // const dataToUpdateOnMyLocalDBTransactionTX_REF = purchaseBills.data.data.tx_ref

    // //go update my db locally with new data
    // const dataToUpdateLocaally = {
    //     payment_flutterwave_flw_ref: dataToUpdateOnMyLocalDBPaymentFLW_REF,
    //     payment_flutterwave_tx_ref: dataToUpdateOnMyLocalDBPaymentTX_REF,
    //     transaction_flutterwave_flw_ref: dataToUpdateOnMyLocalDBTransactionFLW_REF,
    //     transaction__flutterwave_tx_ref: dataToUpdateOnMyLocalDBTransactionTX_REF,
    //     sn: respFromTransactionResultID

    // }

    // await transactionModels.updateTransaction(dataToUpdateLocaally)
   
    res.status(200).send({
        status: true,
        message: "Transaction is completed",
        data: []
    })

    } catch (e) {
      //  console.log(err)
      console.log("needed a payment respnse: ", e.data)
    res.status(400).send({
        status: false,
        message: e.data,
        data: null
    })
}

}


const validateBillsPayment = async (req, res) => {

}



module.exports = {
    getBillsPaymentCategories,
    validateBillsPayment,
    purchaseBillsPayment
}