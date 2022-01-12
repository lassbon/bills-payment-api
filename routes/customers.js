const express = require('express')
const router = express.Router()
const customerController = require('../controllers/customers')



/*
    get all customers details
    route - /customers
    endpoint - localhost:8080/customers
*/
// router.get('/customers', (
// })
router.get('/customers', customerController.getAllCustomers)



module.exports = router
