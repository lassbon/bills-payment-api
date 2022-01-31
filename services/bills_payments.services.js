require('dotenv').config()
const axios = require('axios').default
const { v4: uuidv4 } = require('uuid')

const getBillsPaymentList = () => {

    return axios({
        method: "get",
        url: `${process.env.FLUTTERWAVE_BASE_URL}/bill-categories`,
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`
        }
    })
}


const validateBillService = (item_code, biller_code, phoneNumber) => {
    
    return axios({
        method: "get",
        url: `${process.env.FLUTTERWAVE_BASE_URL}/bill-items/${item_code}/validate?code=${biller_code}&customer=${phoneNumber}`,
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`
        }
    })
}

//serviceToBuy can be phone for airtime, smartcard number for dstv
// serviceType is gotten from billers category called  billers_name
// name is gotten from billers category called  name

const purchases = (serviceToBuy, amount, serviceType, name) => {
    
    return axios({
        method: "post",
        url: `${process.env.FLUTTERWAVE_BASE_URL}/bills`,
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`
        },
        data: {
            country: 'NG',
            customer: serviceToBuy,
            amount: amount,
            recurrence: 'ONCE',
            type: serviceType,
            reference: uuidv4(),
            biller_name: name
          
        }
    })
}


const validateBillsPaymentStatus =  (reference) => {
    
    return axios({
        method: "get",
        url: `${process.env.FLUTTERWAVE_BASE_URL}/${reference}`,
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`
        }
    })
}
    
{}



module.exports = {
    getBillsPaymentList,
    purchases,
    validateBillService,
    validateBillsPaymentStatus
}