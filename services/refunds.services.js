require('dotenv').config()
const axios = require('axios').default


const createRefunds = async(data) => {
    
    return axios({
        method: "post",
        url: `${process.env.PAYSTACK_BASE_URL}/refund`,
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
        },
        data: {
            "transaction": data.transaction,
            "amount": data.amount,
            "currency": "NGN",
            "customer_note": data.customer_note,
            "merchant_note": data.merchant_note
        }

    })
}

const listRefunds =   async (data)=> {


return axios({
    method: "get",
    url: `${process.env.PAYSTACK_BASE_URL}/refund`,
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.PAYSTACK_SECRET_KEY}?reference_id=${data.reference_id}&${data.currency}&from=${data.from}&to=${data.to}&perPage=${data.perPage}&page=${data.page}`
    }
})
}

const fecthRefunds = async (reference)=> {
    return axios({
        method: 'get',
        url: `${process.env.PAYSTACK_BASE_URL}/${reference}`,
        headers: {
            "Authorization": `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
        }
    })
}

module.exports = {
    createRefunds,
    listRefunds,
    fecthRefunds
}