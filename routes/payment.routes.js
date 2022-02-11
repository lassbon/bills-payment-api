const express = require('express')
const router = express.Router()
const paymentController  = require('../controllers/payment.controllers')



router.post('/payment/initialize', paymentController.createTransaction)

router.get('/payment/verify/:payment_ref', paymentController.verifyTransaction)

router.post('/subscription/create', paymentController.createNewSubscription)

router.get('/subscription/list', paymentController.listNewSubscription)

router.get('/subscription/fetch/:id_or_code', paymentController.fetchNewSubscription)

module.exports = router
