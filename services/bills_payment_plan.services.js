require('dotenv').config()
const axios = require('axios').default




const createPlanCategories = async (data) =>{
    
    return axios({
        method: "post",
        url: `${process.env.PAYSTACK_BASE_URL}/plan/create`,
        path: 'plan',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
        },
        data: {
            "name": data.name,
            "amount": parseFloat(data.amount) * 100,
            "interval": data.interval
          
        }
    })
}

const getListPlan = async (page)=>{
    
    return axios({
        method: "Get",
        url: `${process.env.PAYSTACK_BASE_URL}/${page}`,
        path: 'plan',
        headers: {
         
            "Authorization": `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
        }

    })
}

module.exports = {
    createPlanCategories,
    getListPlan
}