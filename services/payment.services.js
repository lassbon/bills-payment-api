require('dotenv').config()
const axios = require('axios').default
const { v4: uuidv4 } = require('uuid')


const initalizePayment = async(data) => {

    const transactionDetails = {
        "tx_ref":uuidv4(),
        "amount": data.amount,
        "currency":"NGN",
        "redirect_url": process.env.PAYMENT_REDIRECT_URL,
        "payment_options": data.paymentOptionType,
        "customer":{
           "email": data.email,
           "phonenumber": data.phone,
           "name": data.fullname
        }
    }
    return axios({
                    method: "post",
                    url: `https://api.flutterwave.com/v3/payments`,
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`
                    },
                    data: transactionDetails
                })
}



const verifyPayment = (transactionReference) => {

    return axios({
        method: "get",
        url: `https://api.flutterwave.com/v3/transactions/${transactionReference}/verify`,
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`
        }
    })
}



module.exports = {
    initalizePayment,
    verifyPayment
}