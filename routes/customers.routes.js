const express = require('express')
const router = express.Router()
const customerController  = require('../controllers/customers.controllers')


router.get('/customers', customerController.getAllCustomers)

router.get('/customer/:varibale1/:phone/:email', customerController.getSingleCustomer )

router.post('/customer/create', customerController.createNewCustomer)

router.put('/customer/:id', customerController.updateCustomer)

router.delete('/customer/:id',  customerController.deleteCustomer )



module.exports = router
