const express = require('express')
const router = express.Router()
const paymentController  = require('../controllers/payment.controllers')



router.post('/payment/initialize', paymentController.createTransaction)

router.get('/payment/verify/:payment_ref', paymentController.verifyTransaction)

router.post('/customer/create-customer', paymentController.createNewCustomer)

router.get('/customer/retrieve-customer', paymentController.listCustomers)

router.get('/customer/get-customer/:email' , paymentController.getCustomer)

router.put('/customer/update-customer' , paymentController.customerUpdate)

router.post('/customer/white-or-blacklist', paymentController.whiteOrBlackListCustomer)



module.exports = router
