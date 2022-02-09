const express = require('express')
const router = express.Router()
const customerController  = require('../controllers/customer.controllers')



router.post('/customer/create-customer', customerController.createNewCustomer)

router.get('/customer/retrieve-customer/:perPage/:page', customerController.listCustomers)

router.get('/customer/get-customer/:email' , customerController.getCustomer)

router.put('/customer/update-customer/:first_name' , customerController.customerUpdate)

router.post('/customer/whiteOrBlackList', customerController.whiteOrBlackListCustomer)




module.exports = router