const express = require('express')
const router = express.Router()
const paymentController  = require('../controllers/payment.controllers')



router.post('/payment/initialize', paymentController.createTransaction)

router.get('/payment/verify/:payment_ref', paymentController.verifyTransaction)

module.exports = router
