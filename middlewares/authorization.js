require('dotenv').config()
const jwt = require('jsonwebtoken')
const { createNewTransaction } = require('../models/payment.models')

const authorization = async(req, res, next) => {

    const customer = req.params.customerEmail
    
    
   
    


}


module.exports = { authorization }

