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

const createSubaccount = async (data) => {
    return axios({
        method: "post",
        url: `${process.env.PAYSTACK_BASE_URL}/subaccount/create`,
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
        },
        data: {
            "business_name":data.business_name,
            "settlement_bank_code":data.settlement_bank_code,
            "account_number":data.account_number,
            "percentage_charge": 0.001,
            //"description": description
        }
    })
}

const listSubaccounts = async() => {
    
    return axios({
        method: "get",
        url: `${process.env.PAYSTACK_BASE_URL}/subaccount?perpage=${listSizePerPage}&page=${pageToGet}`,
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
        }
        
    })
}


const getSubaccount = async(id) => {
    return axios({
        method: "get",
        url: `${process.env.PAYSTACK_BASE_URL}/subaccount/:id`,
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
        }
        
    })
}


const updateSubaccount = async (data) => {
    return axios({
        method: "put",
        url: `${process.env.PAYSTACK_BASE_URL}/subaccount/:id`,
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
        },
        data: {
            "business_name":data.business_name,
            "settlement_bank_code":data.settlement_bank_code,
            
        }
    })
}





module.exports = {
    initalizePayment,
    verifyPayment,
    createSubaccount,
    listSubaccounts,
    getSubaccount,
    updateSubaccount
}