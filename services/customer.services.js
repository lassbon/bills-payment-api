require('dotenv').config()
const { default: axios } = require("axios")



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



const getCustomersList = async(perPage, Page) => {

    return axios({
            method: "get",
            url: `${process.env.PAYSTACK_BASE_URL}/customer/${perPage}/${Page}`,
            headers: {
                "Content-Type": "application/json",
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


const updateCustomer = (first_name) => {
    return axios({
        method : "put",
        url: `${process.env.PAYSTACK_BASE_URL}/customer`,
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
        },
        data:{
            "first_name": data.first_name,
            "last_name": data.last_name,
            
        }
    })

}


const blackOrWhiteListing = (data) => {
    return axios({
        method : "post",
        url: `${process.env.PAYSTACK_BASE_URL}/customer`,
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
    createCustomer,
    getCustomersList,
    fetchCustomer,
    updateCustomer,
    blackOrWhiteListing,
}