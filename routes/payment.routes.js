const express = require('express')
const router = express.Router()
const paymentController  = require('../controllers/payment.controllers')



router.post('/payment/initialize', paymentController.createTransaction)
router.post('/payment/charge', paymentController.chargeTransaction)
router.post('/payment/submit_pin', paymentController.submitPin)
router.post('/payment/submit_phone', paymentController.submitOtp)
router.post('/payment/submit_otp', paymentController.submitOtp)

router.get('/payment/verify/:payment_ref', paymentController.verifyTransaction)
router.get('/payment/charge/:reference', paymentController.checkPendingCharge)

module.exports = router
