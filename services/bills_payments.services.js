require('dotenv').config()
const axios = require('axios').default
const { v4: uuidv4 } = require('uuid')


const getAccessToken = () => {

        return axios({
        method: "post",
        url: `https://auth.reloadly.com/oauth/token`,
        headers: {
            "Content-Type": "application/json",
        },
        data: {
                
                 "client_id": `${process.env.RELOADLY_CLIENT_ID_PROD}`,
                 "client_secret": `${process.env.RELOADLY_SECRET_PROD}`,
                 "grant_type":"client_credentials",
                 "audience":"https://topups.reloadly.com"
                
        }
    })
}


const getBillsPaymentList = async () => {

    // return axios({
    //     method: "get",
    //     url: `${process.env.FLUTTERWAVE_BASE_URL}/bill-categories?${queryString}`,
    //     headers: {
    //         "Content-Type": "application/json",
    //         "Authorization": `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`
    //     }
    // })
    const getToken = await getAccessToken()
    
    // console.log(`here: ${JSON.stringify(getToken.data.access_token)}`)
    
        return axios({
                        method: "get",
                        url: `${process.env.RELOADLY_BASE_URL_PROD}/operators/countries/NG`,
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${getToken.data.access_token}`
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

// const purchases = (serviceToBuy, amount, serviceType, name) => {

const purchases = async (operatorID, amount, phoneNumber) => {
    
    const getToken = await getAccessToken()

    return axios({
        method: "post",
        url: `${process.env.RELOADLY_BASE_URL_PROD}/topups`,
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken.data.access_token}`
        },
        data: {
                "operatorId":operatorID,
                "amount": amount,
                "useLocalAmount": false,
                "customIdentifier": uuidv4(),
                "recipientPhone": {
                    "countryCode": "NG",
                    "number": phoneNumber
                }
        }
    })

    // return axios({
    //     method: "post",
    //     url: `${process.env.FLUTTERWAVE_BASE_URL}/bills`,
    //     headers: {
    //         "Content-Type": "application/json",
    //         "Authorization": `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`
    //     },
    //     data: {
    //         country: 'NG',
    //         customer: serviceToBuy,
    //         amount: amount,
    //         recurrence: 'ONCE',
    //         type: serviceType,
    //         reference: uuidv4(),
    //         biller_name: name
          
    //     }
    // })
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