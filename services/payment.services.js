require('dotenv').config()
const axios = require('axios').default
const { v4: uuidv4 } = require('uuid')


const initalizePayment = async(data) => {

    return axios({
                    method: "post",
                    url: `${process.env.PAYSTACK_BASE_URL}/transaction/initialize`,
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
                    },
                    data: {
                        "email": data.email,
                        "amount": parseFloat(data.amount) * 100,
                        "currency": "NGN",
                        "ref": uuidv4()
                    }
                })
}



const verifyPayment = async(payment_ref) => {

return axios({
        method: "get",
        url: `${process.env.PAYSTACK_BASE_URL}/transaction/verify/${payment_ref}`,
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
        },
})
    
}


const createSubscription = async(data) => {

    return axios({
            method: "post",
            url: `${process.env.PAYSTACK_BASE_URL}/subscription`,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
            },
            data: {
                "customer": data.customer, 
                "plan": data.plan 
            }
    })
}


const listSubscription = async(perPage,page) => {

    return axios({
            method: "get",
            url: `${process.env.PAYSTACK_BASE_URL}/subscription?perPage=${perPage}&page=${page}`,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
            }
             
    })
}

const fetchSubscription = async(id_or_code) => {

    return axios({
            method: "get",
            url: `${process.env.PAYSTACK_BASE_URL}/subscription/${id_or_code}`,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
            }
            
    })
}

module.exports = {
    initalizePayment,
    verifyPayment,
    createSubscription,
    listSubscription,
    fetchSubscription
}