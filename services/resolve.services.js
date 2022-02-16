require('dotenv').config()
const axios = require('axios').default
const { v4: uuidv4 } = require('uuid')



const resolveBvn = () => {

    return axios({
    method: "get",
    url: `${process.env.PAYSTACK_BASE_UR}/bank/resolve_bvn?{BVN}`, 
    headers: {
        "Authorization": `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
        },
    })
}

const resolveAccountNumber = () => {

    return axios({
    method: "get",
    url: `${process.env.PAYSTACK_BASE_URL}/bank/resolve?account_number=ACCOUNT_NUMBER&bank_code=BANK_CODE`,
    headers: {
        "Authorization": `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
        },
    })
}
 
const resolveCardBin = () => {

    return axios({
    method: "get",
    url: `${process.env.PAYSTACK_BASE_URL}/decision/bin?{BIN)`,
    headers: {
        "Authorization": `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
        },
    })
}

const resolvePhoneNumber = (data) => {

    return axios({
    method: "post",
    url: `${process.env.PAYSTACK_BASE_URL}/verifications`,
    headers: {
        "Authorization": `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
        },
        data:{
            "verification_type": data.verification_type,
            "phone":data.phone,
            "callback_url":'https://linktopage.com/truecaller'
        },
    })
}

module.exports ={
    resolveBvn,
    resolveAccountNumber,
    resolveCardBin,
    resolvePhoneNumber
}