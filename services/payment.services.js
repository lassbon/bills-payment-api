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


const createCustomer = (data) => {
    return axios({
        method : "post",
        url: `${process.env.PAYSTACK_BASE_URL}/customer`,
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
        },
        data:{
            "email": data.email,
            "first_name": data.first_name,
            "last_name": data.last_name,
            "phone": data.phone
        }
    })

}



const getCustomersList = (perPage, Page) => {

    return axios({
            method: "get",
            url: `${process.env.PAYSTACK_BASE_URL}/customer?perPage=${perPage}&page=${Page}`,
            headers: {
                // "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
            },
    })
        
}
    

const fetchCustomer = async(email) => {

        return axios({
                method: "get",
                url: `${process.env.PAYSTACK_BASE_URL}/customer/${email}`,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
                },
        })
            
}


const updateCustomer = (id) => {
    return axios({
        method : "put",
        url: `${process.env.PAYSTACK_BASE_URL}/customer?ID_=id`,
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
        },
        data:{
            "id" : data.id_,
            "first_name": data.first_name,
            "last_name": data.last_name,
            
        }
    })

}


const blackOrWhiteListing = (data) => {
 
    return axios({
        method : "post",
        url: `${process.env.PAYSTACK_BASE_URL}/customer/set_risk_action`,
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
        },
        data:{
            "email": data.email,
            "risk_action": data.risk_action,
            
        }
    })

}





module.exports = {
    initalizePayment,
    verifyPayment,
    createCustomer,
    getCustomersList,
    fetchCustomer,
    updateCustomer,
    blackOrWhiteListing,
}