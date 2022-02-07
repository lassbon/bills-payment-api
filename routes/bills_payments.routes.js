const express = require('express')
const router = express.Router()
const billsPaymentController  = require('../controllers/bills_payments.controllers')



router.get('/bills-payment/categories', billsPaymentController.getBillsPaymentCategories)

router.post('/bills-payment/purchases', billsPaymentController.purchaseBillsPayment)

router.get('/bills-payment/:item_code/:bill_code/:phoneNumber/validate', billsPaymentController.validateBillsPayment)

module.exports = router
