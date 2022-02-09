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

const chargeTransaction = async(data) => {

    return axios({
            method: "post",
            url: `${process.env.PAYSTACK_BASE_URL}/charge`,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
            },
            data: {
                "email": data.email,
                "amount": parseFloat(data.amount) * 100,
                "bank":
                     {"cvv":data.bank.cvv,
                        "accountNUmber": data.bank.accountNUmber
                    },
                "dob": data.dob
            }
    })
        
    }

const submitPin = async(pin) => {

        return axios({
                        method: "post",
                        url: `${process.env.PAYSTACK_BASE_URL}/charge/submit_pin`,
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
                        },
                        data: {
                            "pin":pin,
                            "reference":reference
                        }
                    })
    }
    const submitOtp = async(otp) => {

        return axios({
                        method: "post",
                        url: `${process.env.PAYSTACK_BASE_URL}/charge/submit_otp`,
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
                        },
                        data: {
                            "otp":otp,
                            "reference":reference
                        }
                    })
    }

    const submitPhone = async(phone) => {

        return axios({
                        method: "post",
                        url: `${process.env.PAYSTACK_BASE_URL}/charge/submit_phone`,
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
                        },
                        data: {
                            "otp":phone,
                            "reference":reference
                        }
                    })
    }
    const pendingCharge = async(reference) => {

        return axios({
                method: "get",
                url: `${process.env.PAYSTACK_BASE_URL}/charge/:reference${reference}`,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
                },
        })
            
        }

module.exports = {
    initalizePayment,
    verifyPayment,
    chargeTransaction,
    submitPin,
    submitOtp,
    submitPhone,
    pendingCharge
}